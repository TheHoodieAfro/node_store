import UserController from "../controllers/user.controller.js";
import ProductController from "../controllers/product.controller.js";
import validate from "../middleware/validateSchema.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { createProductSchema } from "../schemas/product.schema.js";
import verifyToken from "../middleware/auth.js";

function routes(app) {
  //Users
  app.get("/api/user", verifyToken, UserController.getUsers);
  app.get("/api/user/:id", verifyToken, UserController.getUserById);
  app.post("/api/user", validate(createUserSchema), UserController.createUser);
  app.put(
    "/api/user/:id",
    validate(createUserSchema),
    UserController.updateUser
  );
  app.delete("/api/user/:id", validate(createUserSchema), UserController.deleteUser);

  app.post("/api/auth", UserController.login);

  //Products
  app.get("/api/product", verifyToken, ProductController.getProducts);
  app.get("/api/product/:id", verifyToken, ProductController.getProductById);
  app.post(
    "/api/product",
    validate(createProductSchema),
    ProductController.createProduct
  );
  app.put(
    "/api/product/:id",
    validate(createProductSchema),
    ProductController.updateProduct
  );
  app.delete("/api/product/:id", validate(createUserSchema), ProductController.deleteProduct);
}

export default routes;
