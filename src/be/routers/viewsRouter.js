import express from "express";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsRouter = express.Router();

viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
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
