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

  async update({ categoryId, update }) {
    const searchCategoryId = { _id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      searchCategoryId,
      update,
      option
    );
    return updatedCategory;
  }

  async deleteById(categoryId) {
    const result = await Category.deleteOne({ _id: categoryId });
    return result;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
