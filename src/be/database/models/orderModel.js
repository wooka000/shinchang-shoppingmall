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

  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  async deleteById(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }
}

const orderModel = new OrderModel();

export { orderModel };
