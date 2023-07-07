import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  productNo: { type: Number, required: true }, // 제품번호
  productName: { type: String, required: true }, // 제품명
  category: { type: String, required: true }, // 카테고리
  price: { type: Number, required: true }, // 가격
  image: { type: String, required: true }, // 이미지
  createAt: { type: Date }, //등록시간
});

export { ProductSchema };
