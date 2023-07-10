import { Router } from "express";
import { categoryService } from "../services/categoryService.js";

const categoryRouter = Router();

// 카테고리 추가 o
categoryRouter.post("/", async (req, res) => {
  try {
    const categoryInfo = req.body;
    const createdCategory = await categoryService.addCategory(categoryInfo);
    res.json(createdCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 카테고리 조회 o
categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 카테고리 수정 o
categoryRouter.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const update = req.body;
    const updatedCategory = await categoryService.setCategory(
      categoryId,
      update
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 카테고리 삭제 o
categoryRouter.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    await categoryService.deleteCategoryData(categoryId);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { categoryRouter };
