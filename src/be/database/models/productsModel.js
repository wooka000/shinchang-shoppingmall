import { model } from "mongoose";
import { ProductsSchema } from "../schema/productsSchema.js";

const Product = model("products", ProductsSchema);

export class ProductsModel {
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAllProducts(
    page,
    perPage,
    sortBy = "createdAt",
    sortOrder = "desc"
  ) {
    const skip = perPage * (page - 1);
    const sortOption = {};

    if (sortBy !== "createdAt") {
      sortOption[sortBy] = sortOrder === "asc" ? 1 : -1;
    }

    const productsPromise = Product.find({})
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);
    const countPromise = Product.countDocuments({});

    const [products, count] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    const totalPage = Math.ceil(count / perPage);

    return { products, totalPage };
  }

  async findAllByCategoryName(
    page = 1,
    perPage = 12,
    categoryName,
    sortBy = "createdAt",
    sortOrder = "desc"
  ) {
    const skip = perPage * (page - 1);
    const sortOption = {};

    if (sortBy !== "createdAt") {
      sortOption[sortBy] = sortOrder === "asc" ? 1 : -1;
    }

    const productsPromise = Product.find({ categoryName })
      .sort(sortOption)
      .skip(skip)
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
