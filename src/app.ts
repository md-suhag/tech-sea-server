import express from "express";
import { router } from "./app/routes";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

import { envVars } from "./app/config/env";

import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [envVars.FRONTEND_URL],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome .Tech sea server is running...",
  });
});

app.use("/api/v1", router);

app.use(notFound);

app.use(globalErrorHandler);
export default app;
