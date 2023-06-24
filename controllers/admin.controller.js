const AdminDAO = require("../dao/Admin.js");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async apiGetAdmin(req, res) {
    try {
      const userObj = {
        username: req.body.username,
        password: req.body.password,
      };
      const reviewResponse = await AdminDAO.getUser(userObj);
      if (reviewResponse) {
        res.json(reviewResponse);
      } else {
        res
          .status(403)
          .json({ status: "fail", message: "Invalid username or password" });
      }
    } catch (e) {
      console.error(e);
      res.status(403).json({ status: "fail", message: "error" });
    }
  }

  static async apiPostAdmin(req, res) {
    try {
      if (req.pass1 === req.pass2) {
        const encryptedPassword = await bcrypt.hash(req.body.pass1, 10);
        const userObj = {
          username: req.body.username,
          password: encryptedPassword,
          email: req.body.email,
        };
        const userresponse = await AdminDAO.addUser(userObj);
        res.json(userresponse);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "Invalid User Data" });
    }
  }

  static async apiUpdateAdmin(req, res) {
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
  static async apiDeleteAdmin(req, res) {
    try {
      deleteResponse = {
        status: "fail",
        message: "Feature not yet designed",
      };
      const deleteResponse = await AdminDAO.deleteUser(deleteResponse);
      res.json(deleteResponse);
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }
};
