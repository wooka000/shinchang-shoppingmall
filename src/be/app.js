import cors from "cors";
import express from "express";
import { viewsRouter, userRouter } from "./routers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(viewsRouter);

app.use("/api/user", userRouter);
// app.use("/api/products", productsRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.use(errorHandler);

export { app };
