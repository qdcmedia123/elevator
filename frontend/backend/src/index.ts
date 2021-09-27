require("dotenv").config();
import mongoose from "mongoose";
import './config/mongoose';
import { app } from "./app";
import log4js from "./services/logs";
const logger = log4js.getLogger("logs");

const start = async () => {
  if (!process.env.JWT_KEY) {
    logger.fatal("JWT key must be defined");
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    logger.fatal("MONGO_URI must be defined");
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.info("Connected to mongodb");
  } catch (error) {
    logger.fatal(error);
  }

  process
    .on("unhandledRejection", (reason, p) => {
      logger.fatal(reason, "Unhandle rejection at promise", p);
    })
    .on("uncaughtException", (err) => {
      logger.fatal(err, "Uncaugh exception thrown");
      process.exit(1);
    });
};
start();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Listening on port ${port}!!`);
});
