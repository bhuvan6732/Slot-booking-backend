const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const bcrypt = require("bcrypt");
let user;
module.exports = class UserDAO {
  static async injectDB(conn) {
    if (user) {
      return;
    } else {
      try {
        user = await conn.db("Fligthsbooking").collection("Users");
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async getUser(obj) {
    try {
      const current_User = await user.findOne({
        $or: [{ username: obj.username }, { email: obj.email }],
      });

      const passwordMatch = await bcrypt.compare(
        obj.password,
        current_User.password
      );
      if (passwordMatch) {
        return current_User;
      } else {
        return None;
      }
    } catch (e) {
      console.error(`Erro:${e}`);
    }
  }

  static async addUser(obj) {
    try {
      const existingUser = await user.findOne({
        $or: [{ username: obj.username }, { email: obj.email }],
      });
      if (existingUser) {
        console.log("User already exists:");
        return { status: "fail", message: "User Already exits" };
      } else {
        return await user.insertOne(obj);
      }
    } catch (e) {
      console.error(e);
    }
  }
};
