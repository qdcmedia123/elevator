import { BadRequestError, NotFoundError, requireAuth } from "@wealthface/common";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import StreamArray from "stream-json/streamers/StreamArray";
import { Plant } from "../../models/plant";
import log4js from "../../services/logs";

const jsonStream = StreamArray.withParser();
const logger = log4js.getLogger("logs");
const router = express.Router();

router.get(
  "/api/plants/test",
  async (_: Request, res: Response) => {
    res.send("Our CI CD Process is running smoothly.");
  }
);

router.post("/api/plants", requireAuth, async (req: Request, res: Response) => {
  let sampleFile: any;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    throw new BadRequestError("No files were uploaded.");
  }

  sampleFile = req.files.plants;

  const joinPath = path.join(process.cwd(), "/src/data/");
  uploadPath = joinPath + sampleFile.name;

  try {
    await sampleFile.mv(uploadPath);
    // @ts-ignore
    await fs.createReadStream(uploadPath).pipe(jsonStream.input);
    jsonStream.on("data", async ({ key, value }) => {
      const newPlant = new Plant(value);
      try {
        await newPlant.save();
        logger.info(`Plant has been saved index ${key}`);
      } catch (err: any) {
        logger.fatal(err);
        throw new Error(err);
      }
    });

    jsonStream.on("end", () => {
      logger.info(`All Plants has been saved.`);
    });
  } catch (err: any) {
    logger.fatal(err);
    throw new Error(err);
  }

  res.send(__dirname);
});

router.get("/api/plant/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Plant id is required.");
  }

  const plants = await Plant.findById(id);

  if(!plants) {
    throw new NotFoundError();
  }

  return res.send(plants);
});

router.get(
  "/api/plants/:limit/:skip/:pstatabb*?",
  requireAuth,
  async (req: Request, res: Response) => {
    let { limit, skip, pstatabb } = req.params;

    if (isNaN(parseInt(limit)) || isNaN(parseInt(skip))) {
      throw new BadRequestError("Please provide limit and skip params.");
    }
    // Where clause on conditaion
    let whereClause = {};

    if (pstatabb && typeof pstatabb === "string") {
      whereClause = { PSTATABB: pstatabb.toUpperCase() };
    }

    const count = await Plant.countDocuments(whereClause);

    const plants = await Plant.find(whereClause, {
      LAT: true,
      LON: true,
      _id: true,
    })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    return res.send({ count, plants });
  }
);

router.get(
  "/api/plants/get-top-plants",
  async (_: Request, res: Response) => {
    const plants = await Plant.aggregate([
      { $sort: { PLNGENAN: -1 } },
      { $limit: 10 },
    ]);
    res.send(plants);
  }
);

router.get(
  "/api/plants/aggregate-generation-at-state",
  async (_: Request, res: Response) => {
    try {
      const plants = await Plant.aggregate([
        {
          $group: {
            _id: "$PSTATABB",
            totalAmount: { $sum: "$PLNGENAN" },
          },
        },
      ]);
      res.send(plants);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

router.get(
  "/api/plants/aggregate-generation",
  async (_: Request, res: Response) => {
    try {
      const plants = await Plant.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$PLNGENAN" },
          },
        },
      ]);
      res.send(plants);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

router.get(
  "/api/plants/distinct-states",
  async (_: Request, res: Response) => {
    const states = await Plant.distinct("PSTATABB");

    return res.send(states);
  }
);

export { router as plantsRouter };
