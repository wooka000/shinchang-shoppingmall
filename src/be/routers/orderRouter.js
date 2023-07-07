import { Router } from "express";
import { orderService } from "../services/orderService.js";

const orderRouter = Router();

// 주문 생성 o
orderRouter.post("/", async (req, res) => {
  try {
    const orderInfo = req.body; // Assuming the order details are sent in the request body
    const createdOrder = await orderService.createOrder(orderInfo);
    res.json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 모든 주문 조회 o
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 주문 조회 o
orderRouter.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 주문 수정 o
orderRouter.put("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const update = req.body; // Assuming the updated order details are sent in the request body
    const updatedOrder = await orderService.updateOrder(orderId, update);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 주문 삭제 o
orderRouter.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await orderService.deleteOrder(orderId);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { orderRouter };
