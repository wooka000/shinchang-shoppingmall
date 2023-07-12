import { productsModel, categoryModel } from "../database/index.js";

class ProductsService {
  async addProduct(productInfo) {
    const createdNewProduct = await productsModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts() {
    const page = 1;
    const limit = 12;
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
      throw new Error("?ï¥?ãπ ?†ú?íàÎ≤àÌò∏?ùò ?ÉÅ?íà??? Ï°¥Ïû¨?ïòÏß? ?ïä?äµ?ãà?ã§.");
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
      throw new Error(`${productId} ?†ú?íà?ùò ?Ç≠?†ú?óê ?ã§?å®?ïò????äµ?ãà?ã§`);
    }

    return { result: "success" };
  }
}

const productsService = new ProductsService(productsModel, categoryModel);

export { productsService };
