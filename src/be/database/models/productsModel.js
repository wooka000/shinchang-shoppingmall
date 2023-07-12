import { model } from "mongoose";
import { ProductsSchema } from "../schema/productsSchema.js";

const Product = model("products", ProductsSchema);

export class ProductsModel {
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAllProducts(page, limit) {
    const skip = (page - 1) * limit;
    const products = await Product.find({})
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);
    return products;
  }

  async findAllByCategoryName(categoryName) {
    const products = await Product.find({ categoryName });
    return products;
  }

  async findByProductNo(productNo) {
    const product = await Product.findOne({ productNo });
    return product;
  }

  async updateByProductNo(productNo, update) {
    const filter = { productNo };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async deleteByProductNo(productNo) {
    const result = await Product.deleteOne({ productNo });
    return result;
  }
}

const productsModel = new ProductsModel();

export { productsModel };
