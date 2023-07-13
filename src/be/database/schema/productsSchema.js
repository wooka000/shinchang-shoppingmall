import mongoose from "mongoose";

const { Schema } = mongoose;
const offset = 1000 * 60 * 60 * 9;
const koreaNow = new Date(new Date().getTime() + offset);

const ProductsSchema = new Schema({
  productNo: { type: Number, required: true, index: true }, // 제품번호
  productName: { type: String, required: true }, // 제품명
  categoryName: { type: String, required: true }, // 카테고리명
  price: { type: Number, required: true }, // 가격
  image: { type: String, required: true }, // 이미지
  createAt: { type: Date, default: koreaNow }, //등록시간
});

export { ProductsSchema };
