import express, { Request, Response } from "express";
import { portConfig } from "./config/port";
import dotenv from "dotenv";
import globalRouter from "./app";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import cors from "cors"
dotenv.config();

const PORT = process.env.PORT ||3000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 


app.use("/api", globalRouter);

app.listen(PORT, () => {
  portConfig(Number(PORT));
});

export default app;
