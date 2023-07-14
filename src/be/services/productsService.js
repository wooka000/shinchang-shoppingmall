import { productsModel, categoryModel } from "../database/index.js";

class ProductsService {
  async addProduct(productInfo) {
    const createdNewProduct = await productsModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts(page, perPage, sortOption) {
    const { products, totalPage } = await productsModel.findAllProducts(
      page,
      perPage,
      sortOption
    );

    return { products, totalPage };
  }

  async getProductsByCategoryName(page, perPage, sortOption, categoryName) {
    const category = await categoryModel.findByName(categoryName);
    const { products, totalPage } = await productsModel.findAllByCategoryName(
      page,
      perPage,
      sortOption,
      category.categoryName
    );

    return { products, totalPage };
  }

  async getProductByProductNo(productNo) {
    const product = await productsModel.findByProductNo(productNo);

    if (!product) {
      throw new Error(`${productNo}에 해당하는 상품이 존재하지 않습니다.`);
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
      throw new Error(`${productNo}에 해당하는 상품이 존재하지 않습니다.`);
    }

    return { result: "success" };
  }
}

const productsService = new ProductsService(productsModel, categoryModel);

export { productsService };
