const UserDAO = require("../dao/User.js");
const bcrypt = require("bcrypt");
module.exports = class UserController {
  static async apiGetUser(req, res) {
    try {
      const userObj = {
        username: req.body.username,
        password: req.body.password,
      };
      const reviewResponse = await UserDAO.getUser(userObj);
      if (reviewResponse) {
        res.json({ status: "succes", user: reviewResponse });
      } else {
        res
          .status(200)
          .json({ status: "fail", message: "Invalid username or password" });
      }
    } catch (e) {
      console.error(e);
      res.status(200).json({ status: "fail", message: "error" });
    }
  }

  static async apiPostUser(req, res) {
    try {
      if (req.pass1 === req.pass2) {
        const encryptedPassword = await bcrypt.hash(req.body.pass1, 10);
        const userObj = {
          username: req.body.username,
          password: encryptedPassword,
          email: req.body.email,
        };
        const userresponse = await UserDAO.addUser(userObj);
        res.json(userresponse);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "Invalid User Data" });
    }
  }

  static async apiUpdateUser(req, res) {
    try {
      updateResponse = {
        status: "fail",
        message: "Feature not yet designed",
      };
      res.json(updateResponse);
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }
  static async apiDeleteUser(req, res) {
    try {
      deleteResponse = {
        status: "fail",
        message: "Feature not yet designed",
      };
      res.json(deleteResponse);
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }
};
