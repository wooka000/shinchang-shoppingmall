import { Router } from "express";
import { orderService } from "../services/orderService.js";

const orderRouter = Router();

// 주문 생성 o
orderRouter.post("/", async (req, res) => {
  try {
    const orderInfo = req.body;
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

// 특정 주문 조회 - orderNo
orderRouter.get("/:orderNo", async (req, res) => {
  try {
    const orderNo = req.params.orderNo;
    const order = await orderService.getOrderByOrderNo(orderNo);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 사용자 주문 조회 - userId
orderRouter.get("/userId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const order = await orderService.getOrderByUserId(userId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 주문 수정 o
orderRouter.put("/:orderNo", async (req, res) => {
  try {
    const orderNo = req.params.orderNo;
    const update = req.body;
    const updatedOrder = await orderService.updateOrder(orderNo, update);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 주문 삭제 o
orderRouter.delete("/:orderNo", async (req, res) => {
  try {
    const orderNo = req.params.orderNo;
    await orderService.deleteOrder(orderNo);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { orderRouter };
