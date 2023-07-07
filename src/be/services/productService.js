import { productModel, categoryModel } from "../database/index.js";

class ProductService {
  async addProduct(productInfo) {
    const createdNewProduct = await productModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts() {
    const products = await productModel.findAllProducts();

    return products;
  }

  async getProductsByCategoryName(categoryName) {
    const category = await categoryModel.findByName(categoryName);
    const products = await productModel.findAllByCategoryId(category._id);

    return products;
  }

  async setProduct(productId, toUpdate) {
    const updatedProduct = await productModel.update({
      productId,
      update: toUpdate,
    });

    return updatedProduct;
  }

  async getProductById(productId) {
    const product = await productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error("해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.");
    }

    return product;
  }

  async deleteProductData(productId) {
    const { deletedCount } = await productModel.deleteById(productId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${productId} 제품의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const productService = new ProductService(productModel, categoryModel);

export { productService };
