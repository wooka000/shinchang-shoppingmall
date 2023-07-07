import { Router } from "express";
import { productService } from "../services/productService.js";

const productRouter = Router();

// 상품 추가(Admin)
productRouter.post("/", async (req, res) => {
  try {
    const productInfo = req.body; // Assuming the product details are sent in the request body
    const createdProduct = await productService.addProduct(productInfo);
    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 전체 목록 조회 o
productRouter.get("/", async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 카테고리 별 상품 목록 조회
productRouter.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await productService.getProductsByCategoryName(categoryId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 상세 항목 조회
productRouter.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 수정(Admin) o
productRouter.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const update = req.body; // Assuming the updated product details are sent in the request body
    const updatedProduct = await productService.setProduct(productId, update);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 삭제(Admin) o
productRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProductData(productId);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { productRouter };
