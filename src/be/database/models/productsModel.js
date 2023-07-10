import { model } from "mongoose";
import { ProductsSchema } from "../schema/productsSchema.js";

const Product = model("products", ProductsSchema);

export class ProductsModel {
  async findAllProducts() {
    const products = await Product.find({}).sort({ createAt: -1 });
    return products;
  }

  async findById(productId) {
    const product = await Product.find({ _id: productId });
    return product;
  }

  async findAllByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });
    return products;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async deleteById(productId) {
    const result = await Product.deleteOne({ _id: productId });
    return result;
  }
}

const productsModel = new ProductsModel();

export { productsModel };
