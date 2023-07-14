import express from "express";
import path from "path";
import url from "url";
// import { adminRequired } from "../middlewares/adminRequired.js";
// import { loginRequired } from "../middlewares/loginRequired.js";

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
viewsRouter.use("/order/complete", serveStatic("orderComplete"));
viewsRouter.use("/products/category", serveStatic("products"));
viewsRouter.use("/products/:productNo", serveStatic("productDetail"));
viewsRouter.use("/mypage", serveStatic("mypage"));
viewsRouter.use("/mypage/modify", serveStatic("mypageModify"));
viewsRouter.use("/mypage/ordinquiry", serveStatic("ordInquiry"));
viewsRouter.use("/error", serveStatic("error"));
viewsRouter.use("/error/forbidden", serveStatic("errorAdmin"));
viewsRouter.use("/ready", serveStatic("ready"));
viewsRouter.use("/", serveStatic(""));
viewsRouter.use(
  "/public",
  express.static(path.join(__dirname, "../../fe/public"))
);

viewsRouter.use("/admin/category", serveStatic("adminCategory"));
viewsRouter.use("/admin/order", serveStatic("adminOrder"));
viewsRouter.use("/admin/product", serveStatic("adminProduct"));
viewsRouter.use("/admin/user", serveStatic("adminUser"));
viewsRouter.use("/admin/error", serveStatic("adminError"));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../../fe/views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
