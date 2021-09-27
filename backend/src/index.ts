require("dotenv").config();
import mongoose from "mongoose";
import './config/mongoose';
import { app } from "./app";


const start = async () => {
 
  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI must be defined");
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }

  process
    .on("unhandledRejection", (reason, p) => {
      console.log(reason, "Unhandle rejection at promise", p);
    })
    .on("uncaughtException", (err) => {
      console.log(err, "Uncaugh exception thrown");
      process.exit(1);
    });
};

start();
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!!`);
});
