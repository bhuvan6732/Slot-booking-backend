const express = require("express");
const router = express.Router();

const slotscontroller = require("./slots.contoller");

router
  .route("/")
  .get(slotscontroller.apiGetSlot)
  .post(slotscontroller.apiAddSlot)
  .put(slotscontroller.apiUpdateCenter)
  .delete(slotscontroller.apiDeleteSlot);
module.exports = router;
