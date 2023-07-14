import { model } from "mongoose";
import { ProductsSchema } from "../schema/productsSchema.js";

const Product = model("products", ProductsSchema);

export class ProductsModel {
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAllProducts(page, perPage, sortOption) {
    const sortQuery = {};

    if (sortOption === "createAt") {
      sortQuery.createAt = -1; // 최신순
    } else if (sortOption === "priceDesc") {
      sortQuery.price = -1; // 가격 내림차순
    } else if (sortOption === "priceAsc") {
      sortQuery.price = 1; // 가격 오름차순
    }

    const productsPromise = Product.find({})
      .sort(sortQuery)
      .skip(perPage * (page - 1))
      .limit(perPage);
    const countPromise = Product.countDocuments({});

    const [products, count] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    const totalPage = Math.ceil(count / perPage);

    return { products, totalPage };
  }

  async findAllByCategoryName(page, perPage, sortOption, categoryName) {
    const sortQuery = {};

    if (sortOption === "createAt") {
      sortQuery.createAt = -1; // 최신순
    } else if (sortOption === "priceDesc") {
      sortQuery.price = -1; // 가격 내림차순
    } else if (sortOption === "priceAsc") {
      sortQuery.price = 1; // 가격 오름차순
    }

    const productsPromise = Product.find({ categoryName })
      .sort(sortQuery)
      .skip(perPage * (page - 1))
      .limit(perPage);
    const countPromise = Product.countDocuments({ categoryName });

    const [products, count] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    const totalPage = Math.ceil(count / perPage);

    return { products, totalPage };
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
