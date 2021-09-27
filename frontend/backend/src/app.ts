import express from "express";
import fileUpload from "express-fileupload";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@wealthface/common";

import { currentUserRouter } from "./routes/users/current-user";
import { signinRouter } from "./routes/users/signin";
import { signoutRouter } from "./routes/users/signout";
import { signupRouter } from "./routes/users/signup";
import { plantsRouter } from "./routes/plants/plants";
import { elevatorIndex } from "./routes/elevator";

// Testing docker
const app = express();
app.use(cors({
  origin: [
             'http://ec2-18-222-10-243.us-east-2.compute.amazonaws.com:3000', 
             'http://localhost:3000'
          ],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
  credentials: true
}));
app.set("trust proxy", true);
app.use(json());
app.use(
  fileUpload({})
);
app.use(
  cookieSession({
    signed: false,
    secure: false, //process.env.NODE_ENV !== "test",
    httpOnly: true
  })
);

app.use(elevatorIndex);
app.use(currentUser);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(plantsRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
