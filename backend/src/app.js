import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routers/product.router";
import categoryRouter from "./routers/category.router.js";
const app = express();
// middleware
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb://localhost:27017/wd19322`);

app.use(`/api`, productRouter);

app.use("/api", categoryRouter);

export const viteNodeApp = app;

