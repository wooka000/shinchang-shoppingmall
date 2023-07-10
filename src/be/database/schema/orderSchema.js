import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderNo: { type: Number, required: true }, // 주문번호
  orderer: { type: String, ref: "User", required: true }, // 주문자
  orderProduct: { type: String, required: true }, // 주문상품
  price: { type: Number, required: true }, // 가격
  orderStatus: { type: String, required: true }, // 주문상태
});

export { OrderSchema };
