import express, { Request, Response } from "express";
import { Elevator } from "../../models/elevator";
import { Position } from "../../models/position";
const router = express.Router();

router.get("/api/elevatorids", async (_: Request, res: Response) => {
  let ids: any = await Elevator.find({}, { id: true, _id: false });
  ids = ids.map((item: any) => {
    return item.id;
  });
  return res.send(ids);
});

router.get("/api/elevator", async (_: Request, res: Response) => {
  const elevators = await Elevator.find({}).limit(1);
  return res.send(elevators);
});

router.post("/api/elevator", async (req: Request, res: Response) => {
  const elevator = new Elevator(req.body);
  const save = await elevator.save();
  return res.send(save);
});

router.delete("/api/elevator/:_id", async (req: Request, res: Response) => {
  const { _id: id } = req.params;
  const elevator = await Elevator.findByIdAndDelete(id);
  return res.send(elevator);
});

router.post("/api/position", async (req: Request, res: Response) => {
  await Position.deleteMany({});
  const position = new Position(req.body);
  const save = await position.save();
  return res.send(save);
});

router.get("/api/position", async (_: Request, res: Response) => {
  const position = await Position.findOne({});
  return res.send(position);
});

router.get("/api/elevator/all", async (_: Request, res: Response) => {
  const elevator = await Elevator.find({});
  res.send(elevator);
});

router.get("/api/get-nearest-request", async (_: Request, res: Response) => {
  const fetchDirection = await Elevator.find(
    {},
    { direction: true, _id: false }
  )
    .sort({ time: 1 })
    .limit(1);
  if (fetchDirection.length === 0) {
    return res.send([]);
  }
  //@ts-ignore
  let { direction } = fetchDirection[0] ?? null;
  let fetchWithDirection: any = [];
  if (direction === "up") {
    fetchWithDirection = await Elevator.find({ direction }, {})
      .sort({ id: 1 })
      .limit(1);
  } else if (direction === "down") {
    fetchWithDirection = await Elevator.find({ direction }, {})
      .sort({
        id: -1,
      })
      .limit(1);
  }
  return res.send(fetchWithDirection);
});

export { router as elevatorIndex };
