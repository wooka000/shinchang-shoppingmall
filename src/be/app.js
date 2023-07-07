import cors from "cors";
import express from "express";
import {
  userRouter,
  productRouter,
  orderRouter,
  categoryRouter,
} from "./routers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);

// app.use(errorHandler);

export { app };
