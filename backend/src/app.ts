import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import { elevatorIndex } from "./routes/elevator";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.set("trust proxy", true);
app.use(json());

app.use(elevatorIndex);

export { app };
