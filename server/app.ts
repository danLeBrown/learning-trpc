import express from "express";

import cors from "cors";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { todoRouter } from "./utils/trpc/routers/todo";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: todoRouter,
  })
);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});