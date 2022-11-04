import { Express, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import ProductController from "../controllers/product.controller";
import validate from "../middleware/validateSchema";
import {createUserSchema} from "../schemas/user.schema"
import verifyToken from "../middleware/auth";

function routes(app) {

    //Users
    app.get('/api/user', verifyToken, UserController.getUser)
    app.get('api/user/:id', verifyToken, UserController.getUserById)
    app.post('/api/user', validate(createUserSchema), UserController.createUserHandler)
    app.put('/api/user/:id', validate(createUserSchema), UserController.updateUserHandler)
    app.delete('/api/user/:id', UserController.deleteUser)

    //Products
    app.get('/api/product', verifyToken, ProductController.getProduct)
    app.get('api/product/:id', verifyToken, ProductController.getProductById)
    app.post('/api/product', validate(createProductSchema), ProductController.createProduct)
    app.put('/api/product/:id', validate(createProductchema), ProductController.updateProductHandler)
    app.delete('/api/product/:id', ProductController.deleteProduct)
}

export default routes