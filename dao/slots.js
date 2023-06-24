const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
let slotscollection;
module.exports = class ReviewsDAO {
  static async injectDB(conn) {
    if (slotscollection) {
      return;
    } else {
      try {
        slotscollection = await conn.db("Fligthsbooking").collection("slots");
      } catch (e) {
        console.error(e);
      }
    }
  }
  static async getSlot(obj) {
    try {
      console.log(obj);
      const cursor = await slotscollection.find({
        centerid: obj.centerid,
        date: obj.date,
      });
      const User_slot = cursor.toArray();
      if (User_slot) {
        return User_slot;
      }
      return { status: "fail", message: "No Slot found" };
    } catch (e) {
      console.error(`Erro:${e}`);
    }
  }

  static async addSlot(obj) {
    try {
      const obj1 = {
        userid: new ObjectId(obj.userid),
        centerid: new ObjectId(obj.centerid),
        date: obj.date,
        time: obj.time,
      };

      const existingSlot = await slotscollection.findOne({
        $and: [
          { userid: obj1.userid },
          { centerid: obj1.centerid },
          { date: obj1.date },
          { time: obj.time },
        ],
      });
      if (existingSlot) {
        return { status: "fail", message: "Slot already taken" };
      }
      return await slotscollection.insertOne(obj1);
    } catch (e) {
      console.error(e);
      return { status: "fail", message: "error" };
    }
  }
  static async deleteSlot(obj) {
    try {
      obj._id = new ObjectId(obj._id);
      return await slotscollection.deleteOne(obj);
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "fail", message: "error" });
    }
  }
};
