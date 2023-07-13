import { orderModel, userModel } from "../database/index.js";

class OrderService {
  async createOrder(orderInfo) {
    const createdOrder = await orderModel.create(orderInfo);
    const orderArray = createdOrder.orderArray;
    return orderArray;
  }

  async getAllOrders() {
    const orders = await orderModel.findAllOrders();
    return orders;
  }

  async getOrderByOrderNo(orderNo) {
    const order = await orderModel.findByOrderNo(orderNo);
    if (!order) {
      throw new Error("해당 주문번호의 주문이 없습니다. 다시 확인해 주세요.");
    }
    return order;
  }

  async getOrderByUserId(userId) {
    const user = await userModel.findByEmail(userId);
    const order = await orderModel.findByUserId(user.email);
    return order;
  }

  async updateOrder(orderNo, update) {
    const updatedOrder = await orderModel.update({ orderNo, update });
    return updatedOrder;
  }

  async deleteOrder(orderNo) {
    const { deletedCount } = await orderModel.deleteByOrderNo(orderNo);
    if (deletedCount === 0) {
      throw new Error(`${orderNo} 주문의 삭제에 실패하였습니다.`);
    }
    return { result: "success" };
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
