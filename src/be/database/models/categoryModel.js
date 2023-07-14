import { model } from "mongoose";
import { CategorySchema } from "../schema/categorySchema.js";

const Category = model("Category", CategorySchema);
export class CategoryModel {
  async findByName(categoryName) {
    const category = await Category.findOne({ categoryName });
    return category;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findAllCategories() {
    const categories = await Category.find({});
    return categories;
  }

  async findCategory(categoryName) {
    const category = await Category.findOne({ categoryName });
    return category;
  }

  async update({ categoryName, update }) {
    const searchCategoryName = { categoryName };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      searchCategoryName,
      update,
      option
    );
    return updatedCategory;
  }

  async deleteByCategoryName(categoryName) {
    const result = await Category.deleteOne({ categoryName });
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
