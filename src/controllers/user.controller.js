import UserService from "../services/user.service.js";
import debug from "debug";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const debuglog = debug("app");

class UserController {
  async getUsers(req, res) {
    try {
      const userExist = await UserService.getUsers();

      if (userExist == null) {
        return res.status(409).send("No current users");
      }

      return res.send(userExist);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const userExist = await UserService.findUserById(req.params.id);

      if (userExist == null) {
        return res.status(409).send("user does not exists");
      }

      userExist.password = "";
      return res.send(userExist);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async createUser(req, res) {
    try {
      debuglog("********************************");
      debuglog(req);
      const userExist = await UserService.findUserByIdentification(req.body.identification);
      if (userExist !== null) {
        return res.status(409).send("user already exists");
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const user = await UserService.createUser(req.body);

      return res.send(user);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const userExist = await UserService.findUserById(req.params.id);

      if (userExist == null) {
        return res.status(409).send("user does not exists");
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      //req.body.password = await bcrypt.hash(req.body.password, 10)

      const user = await UserService.updateUser(req.params.id, req.body);

      return res.send(user);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const userExist = await UserService.findUserById(req.params.id);

      if (userExist == null) {
        return res.status(409).send("user does not exists");
      }

      let user = await UserService.deleteUser(req.params.id);
      return res.send(user);
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.findUserByIdentification(req.body.identification);
      debuglog(req.body.password);
      debuglog(user.password);
      if (
        user !== null &&
        (await bcrypt.compare(req.body.password, user.password))
      ) {
        const token = jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.SECRET,
          { expiresIn: "2h" }
        );

        return res
          .status(200)
          .send({ email: user.email, name: user.name, token });
      }

      return res.status(401).send("user or password incorrect");
    } catch (error) {
      debuglog(error);

      return res.status(409).send(error.message);
    }
  }
}
export default new UserController();
