const express = require("express");
const router = express.Router();
// const FlightsController = require("./flights.controller");
const UserController = require("./user.controller");
const AdminController = require("./admin.controller");

router.route("/login").post(UserController.apiGetUser);
router.route("/signup").post(UserController.apiPostUser);

router.route("/admin/login").post(AdminController.apiGetAdmin);
router.route("/admin/signup").post(AdminController.apiPostAdmin);

router
  .route("/users")
  .put(UserController.apiUpdateUser)
  .delete(UserController.apiDeleteUser);
router
  .route("/admin")
  .put(AdminController.apiUpdateAdmin)
  .delete(AdminController.apiDeleteAdmin);

module.exports = router;
