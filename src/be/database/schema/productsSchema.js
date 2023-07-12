import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductsSchema = new Schema({
  productNo: { type: Number, required: true, index: true }, // 제품번호
  productName: { type: String, required: true }, // 제품명
  categoryName: { type: String, required: true }, // 카테고리명
  price: { type: Number, required: true }, // 가격
  image: { type: String, required: true }, // 이미지
  createAt: { type: Date, default: Date.now }, //등록시간
});

export { ProductsSchema };
