import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

import "./db";
import apiRouter from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

// MIDDLEWAREs
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Log requests
app.use(morgan("dev"));
// CORS
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use("/api", apiRouter);
