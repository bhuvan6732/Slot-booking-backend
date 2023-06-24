const { ObjectId } = require("mongodb");
const centerDAO = require("./../dao/Vaccine.js");
const bcrypt = require("bcrypt");

module.exports = class centerController {
  static async apiGetCenter(req, res) {
    const vaccinePerPage = req.query.vaccinePerPage
      ? parseInt(req.query.vaccinePerPage)
      : 10;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    let filters = {};
    if (req.query.city) {
      filters.city = req.query.city;
    } else if (req.query.area) {
      filters.area = req.query.area;
    }
    const result = await centerDAO.getCenters({
      filters,
      vaccinePerPage,
      page,
    });
    res.json(result);
  }

  static async apiGetCenterById(req, res) {
    try {
      let id = { filters: { _id: req.params.id || {} } };
      let center = await centerDAO.getCenter(id);
      if (!center) {
        res.status(400).json({ status: "fail", message: "No such center" });
      }
      res.json(center);
    } catch (e) {
      console.error(e);
    }
  }

  static async apiAddCenter(req, res) {
    try {
      if (req.body.center) {
        const center = {
          name: req.body.center.name,
          contact: req.body.center.contact,
          city: req.body.center.city,
          area: req.body.center.area,
          numberofvaccine: req.body.center.numberofvaccine,
          adminid: new ObjectId(req.body.center.adminid),
          workinghours: req.body.center.workinghours,
        };
        console.log(center);
        const userresponse = await centerDAO.addCenter(center);
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
  static async apiDeleteCenter(req, res) {
    try {
      const obj = { _id: new ObjectId(req.body._id) };
      const deleteResponse = await centerDAO.deleteCenter(obj);
      res.json(deleteResponse);
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }
};
