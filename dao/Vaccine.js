const mongodb = require("mongodb");
const bcrypt = require("bcrypt");

const ObjectId = mongodb.ObjectId;
const AdminDAO = require("./Admin");

let centercollection;
module.exports = class ReviewsDAO {
  static async injectDB(conn) {
    if (centercollection) {
      return;
    } else {
      try {
        centercollection = await conn.db("Fligthsbooking").collection("center");
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async getCenters(obj) {
    let query;
    if (obj.filters) {
      if (obj.filters.hasOwnProperty("area")) {
        query = { $text: { $search: obj.filters["area"] } };
      } else if (obj.filters.hasOwnProperty("city")) {
        query = { $text: { $search: obj.filters["city"] } };
      }
    }
    let cursor;
    try {
      cursor = await centercollection
        .find(query)
        .limit(obj.vaccinePerPage * 1)
        .skip(obj.vaccinePerPage * obj.page);
      const centerList = await cursor.toArray();

      return centerList;
    } catch (e) {
      console.error(`Erro:${e}`);
    }
  }

  static async getCenter(obj) {
    try {
      const User_slot = await centercollection.findOne({
        $or: [{ _id: new ObjectId(obj.filters._id) }],
      });
      if (User_slot) {
        return User_slot;
      }
      return { status: "fail", message: "No Such center found" };
    } catch (e) {
      console.error(`Erro:${e}`);
    }
  }

  static async addCenter(obj) {
    try {
      const existingCenter = await centercollection.findOne({
        $or: [{ centername: obj.name }, { contact: obj.contact }],
      });
      const userobj = {
        _id: obj.adminid,
      };
      const adminuser = await AdminDAO.getUser(userobj);
      if (adminuser._id == null) {
      }
      if (existingCenter != null) {
        return { status: "fail", message: "Center already exists" };
      } else {
        return await centercollection.insertOne(obj);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteCenter(obj) {
    try {
      obj._id = new ObjectId(obj._id);
      return await centercollection.deleteOne(obj);
    } catch (e) {
      console.error(e);
      return e;
    }
  }
};
