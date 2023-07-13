import mongoose from "mongoose";

const { Schema } = mongoose;
const offset = 1000 * 60 * 60 * 9;
const koreaNow = new Date(new Date().getTime() + offset);

const OrderSchema = new Schema({
  orderNo: { type: Number, required: true, index: true }, // 주문 번호
  userName: { type: String, required: true }, // 주문자 이름
  phoneNumber: { type: String, required: true }, // 주문자 전화번호
  userEmail: { type: String, default: "" }, // 주문자 이메일
  recipientName: { type: String, required: true }, // 수령인 이름
  addressCode: { type: String, required: true }, // 우편번호
  address: { type: String, required: true }, // 주소
  detailAddress: { type: String, default: "" }, // 상세주소
  extraAddress: { type: String, default: "" }, // 주소 참고항목
  deliveryMessage: { type: String, default: "" }, // 배송 메모
  orderArray: [
    {
      productNo: { type: Number, required: true }, // 상품 번호
      productName: { type: String, required: true }, // 상품 이름
      price: { type: Number, required: true }, // 상품 가격
      quantity: { type: Number, required: true }, // 상품 수량
    },
  ],
  createAt: { type: Date, default: koreaNow }, //등록시간
  userId: { type: String, required: true }, // 유저 ID,
  status: { type: String, required: true }, // 주문 상태
});

export { OrderSchema };
