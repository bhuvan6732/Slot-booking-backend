const { ObjectId } = require("mongodb");
const slotsDAO = require("./../dao/slots.js");
const bcrypt = require("bcrypt");

module.exports = class slotscontroller {
  //
  static async apiGetSlot(req, res) {
    console.log("error");
    let filters = {
      centerid: new ObjectId(req.body.centerid),
      date: req.body.date,
    };
    console.log(filters);
    const Slot = await slotsDAO.getSlot(filters);
    res.json(Slot);
  }

  static async apiAddSlot(req, res) {
    try {
      if (req.body.center) {
        const slotobj = {
          centerid: req.body.center,
          userid: req.body.userid,
          date: req.body.date,
          time: req.body.time,
        };
        console.log(slotobj);
        const userresponse = await slotsDAO.addSlot(slotobj);
        res.json(userresponse);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "Invalid User Data" });
    }
  }

  static async apiUpdateCenter(req, res) {
    try {
      res.json({ status: "fail", message: "Feature not yet implemented" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }

  static async apiDeleteSlot(req, res) {
    try {
      const obj = { _id: req.body._id };
      const deleteResponse = await slotsDAO.deleteSlot(obj);
      res.json(deleteResponse);
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }
};
