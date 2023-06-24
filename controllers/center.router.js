const express = require("express");
const router = express.Router();

const vaccineController = require("./vaccine.controller");
const slotscontroller = require("./slots.contoller");

router
  .route("/")
  .get(vaccineController.apiGetCenter)
  .post(vaccineController.apiAddCenter)
  .put(vaccineController.apiUpdateCenter)
  .delete(vaccineController.apiDeleteCenter);
router.route("/:id").get(vaccineController.apiGetCenterById);

module.exports = router;
