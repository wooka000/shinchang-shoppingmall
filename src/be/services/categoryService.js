import { categoryModel, productModel } from "../database/index.js";

class CategoryService {
  async addCategory(categoryInfo) {
    const { categoryName } = categoryInfo;

    const category = await categoryModel.findByTitle(categoryName);
    if (category) {
      throw new Error("존재하는 카테고리명 입니다. 다른 이름을 입력해 주세요.");
    }

    const createdNewCategory = await categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  async getCategories() {
    const categories = await categoryModel.findAllCategories();
    return categories;
  }

  async setCategory(categoryId, toUpdate) {
    const updatedCategory = await categoryModel.update({
      categoryId,
      update: toUpdate,
    });

    return updatedCategory;
  }

  async getCategoryDataByTitle(categoryTitle) {
    const category = await categoryModel.findByTitle(categoryTitle);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error(
        "해당 이름의 카테고리는 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return category;
  }

  async deleteCategoryData(categoryId) {
    // // 만약 해당 카테고리의 제품이 1개라도 있다면, 삭제 불가함.
    // const product = await productModel.findOneByCategoryId(categoryId);

    // if (product) {
    //   throw new Error(
    //     `${categoryId} 카테고리에 등록된 제품이 있습니다. 등록된 제품이 없어야 카테고리 삭제가 가능합니다. `
    //   );
    // }

    const { deletedCount } = await categoryModel.deleteById(categoryId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${categoryId} 카테고리의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const categoryService = new CategoryService(categoryModel, productModel);

export { categoryService };
