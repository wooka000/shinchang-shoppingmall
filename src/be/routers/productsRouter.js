import { Router } from "express";
import { productsService } from "../services/productsService.js";

const productsRouter = Router();

// 상품 추가(Admin) o
productsRouter.post("/", async (req, res) => {
  try {
    const productInfo = req.body; // Assuming the product details are sent in the request body
    const createdProduct = await productsService.addProduct(productInfo);
    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 전체 목록 조회 o
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 카테고리 별 상품 목록 조회
productsRouter.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await productsService.getProductsByCategoryName(
      categoryId
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 상세 항목 조회
productsRouter.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productsService.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 수정(Admin) o
productsRouter.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const update = req.body; // Assuming the updated product details are sent in the request body
    const updatedProduct = await productsService.setProduct(productId, update);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 삭제(Admin) o
productsRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    await productsService.deleteProductData(productId);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { productsRouter };
