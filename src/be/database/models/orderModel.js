import { model } from "mongoose";
import { OrderSchema } from "../schema/orderSchema.js";

const Order = model("Order", OrderSchema);

export class OrderModel {
  async create(orderInfo) {
    const createdOrder = await Order.create(orderInfo);
    return createdOrder;
  }

  async findAllOrders() {
    const orders = await Order.find({});
    return orders;
  }

  async findByOrderNo(orderNo) {
    const order = await Order.findOne({ orderNo });
    return order;
  }

  async findByUserId(userId) {
    const order = await Order.findOne({ userId });
    return order;
  }

  async update({ orderNo, update }) {
    const filter = { orderNo };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  async deleteByOrderNo(orderNo) {
    const result = await Order.deleteOne({ orderNo });
    return result;
  }
}

const orderModel = new OrderModel();

export { orderModel };
