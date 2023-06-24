const express = require("express");
const router = express.Router();

const slotscontroller = require("./slots.contoller");

router.route("/find").post(slotscontroller.apiGetSlot);
router
  .route("/")
  .post(slotscontroller.apiAddSlot)
  .put(slotscontroller.apiUpdateCenter)
  .delete(slotscontroller.apiDeleteSlot);
module.exports = router;
