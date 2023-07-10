import { orderModel } from "../database/index.js";

class OrderService {
  async createOrder(orderInfo) {
    const createdOrder = await orderModel.create(orderInfo);
    return createdOrder;
  }

  async getAllOrders() {
    const orders = await orderModel.findAllOrders();
    return orders;
  }

  async getOrderById(orderId) {
    const order = await orderModel.findById(orderId);
    if (!order) {
      throw new Error("해당 주문번호의 주문이 없습니다. 다시 확인해 주세요.");
    }
    return order;
  }

  async updateOrder(orderId, update) {
    const updatedOrder = await orderModel.update({ orderId, update });
    return updatedOrder;
  }

  async deleteOrder(orderId) {
    const { deletedCount } = await orderModel.deleteById(orderId);
    if (deletedCount === 0) {
      throw new Error(`${orderId} 주문의 삭제에 실패하였습니다.`);
    }
    return { result: "success" };
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
