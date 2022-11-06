import { Request, Response } from "express";
import ProductService from "../services/product.service";
import debug from "debug";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserDocument } from "../model/product.model";

const debuglog = debug("app");

class ProductController {
  async getProducts(req, res) {
    try {
      const productExist = await ProductService.getProducts();

      if (productExist == null) {
        return res.status(409).send("No current products");
      }

      return res.send(productExist);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async getProductById(req, res) {
    try {
      const productExist = await ProductService.findProductById(req.params.id);

      if (productExist == null) {
        return res.status(409).send("Product does not exists");
      }

      return res.send(productExist);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async createProduct(req, res) {
    try {
      debuglog("********************************");
      debuglog(req);
      const productExist = await ProductService.findUserByName(req.body.name);
      if (productExist !== null) {
        return res.status(409).send("Product already exists");
      }

      const user = await ProductService.createProduct(req.body);

      return res.send(user);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      const productExist = await ProductService.findProductById(req.params.id);

      if (productExist == null) {
        return res.status(409).send("Product does not exists");
      }

      //req.body.password = await bcrypt.hash(req.body.password, 10)

      const user = await ProductService.updateProduct(req.params.id, req.body);

      return res.send(user);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const productExist = await ProductService.findProductById(req.params.id);

      if (productExist == null) {
        return res.status(409).send("Product does not exists");
      }

      let user = await ProductService.deleteProduct(req.params.id);
      return res.send(user);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }
}
export default new ProductController();
