import express from "express";
import path from "path";
import url from "url";
import { adminRequired } from "../middlewares/adminRequired.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsRouter = express.Router();

viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/products", serveStatic("products"));
viewsRouter.use("/productDetail", serveStatic("productDetail"));
viewsRouter.use("/order", serveStatic("order"));
viewsRouter.use("/cart", serveStatic("cart"));
viewsRouter.use("/admin/category", adminRequired, serveStatic("adminCategory"));
viewsRouter.use("/admin/order", adminRequired, serveStatic("adminOrder"));
viewsRouter.use("/admin/product", adminRequired, serveStatic("adminProduct"));
viewsRouter.use("/admin/user", adminRequired, serveStatic("adminUser"));
viewsRouter.use("/order/complete", serveStatic("orderComplete"));
viewsRouter.use("/products/category", serveStatic("products"));
viewsRouter.use("/products/:productNo", serveStatic("productDetail"));
viewsRouter.use("/mypage", loginRequired, serveStatic("mypage"));
viewsRouter.use("/mypage/modify", loginRequired, serveStatic("mypageModify"));
viewsRouter.use("/mypage/ordinquiry", loginRequired, serveStatic("ordInquiry"));
viewsRouter.use("/error", serveStatic("error"));
viewsRouter.use("/error/forbidden", serveStatic("errorAdmin"));
viewsRouter.use("/", serveStatic(""));
viewsRouter.use(
  "/public",
  express.static(path.join(__dirname, "../../fe/public"))
);

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../../fe/views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
