import { productsModel, categoryModel } from "../database/index.js";

class ProductsService {
  async addProduct(productInfo) {
    const createdNewProduct = await productsModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts() {
    const products = await productsModel.findAllProducts();

    return products;
  }

  async getProductsByCategoryName(categoryName) {
    const category = await categoryModel.findByName(categoryName);
    const products = await productsModel.findAllByCategoryId(category._id);

    return products;
  }

  async getProductByProductNo(productNo) {
    const product = await productsModel.findByProductNo(productNo);

    if (!product) {
      throw new Error("해당 제품번호의 상품은 존재하지 않습니다.");
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
      throw new Error(`${productId} 제품의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const productsService = new ProductsService(productsModel, categoryModel);

export { productsService };
