import { productsModel, categoryModel } from "../database/index.js";

class ProductsService {
  async addProduct(productInfo) {
    const createdNewProduct = await productsModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts(page, limit) {
    const skip = (page - 1) * limit;
    const products = await productsModel.findAllProducts(skip, limit);

    return products;
  }

  async getProductsByCategoryName(categoryName) {
    const category = await categoryModel.findByName(categoryName);
    const products = await productsModel.findAllByCategoryName(
      category.categoryName
    );

    return products;
  }

  async getProductByProductNo(productNo) {
    const product = await productsModel.findByProductNo(productNo);

    if (!product) {
      throw new Error("?��?�� ?��?��번호?�� ?��?��??? 존재?���? ?��?��?��?��.");
    }

    return product;
  }

  async setProductByProductNo(productNo, toUpdate) {
    const updatedProduct = await productsModel.updateByProductNo(
      productNo,
      toUpdate
    );

    return updatedProduct;
  }

  async deleteProductByProductNo(productNo) {
    const { deletedCount } = await productsModel.deleteByProductNo(productNo);

    if (deletedCount === 0) {
      throw new Error(`${productId} ?��?��?�� ?��?��?�� ?��?��?��????��?��?��`);
    }

    return { result: "success" };
  }
}

const productsService = new ProductsService(productsModel, categoryModel);

export { productsService };
