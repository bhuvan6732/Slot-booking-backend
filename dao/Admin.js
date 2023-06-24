const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const bcrypt = require("bcrypt");

let users;
module.exports = class ReviewsDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    } else {
      try {
        users = await conn.db("Fligthsbooking").collection("Admins");
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async getUser(obj) {
    try {
      const current_User = await users.findOne({
        $or: [
          { username: obj.username },
          { email: obj.email },
          { _id: new ObjectId(obj._id) },
        ],
      });
      if (obj.password) {
        const passwordMatch = await bcrypt.compare(
          obj.password,
          current_User.password
        );
        if (passwordMatch) {
          return current_User;
        } else {
          return { status: "fail", message: "Invalid password" };
        }
      }
      if (current_User) {
        return { _id: current_User._id };
      } else {
        return { status: "fail", message: "No user found" };
      }
    } catch (e) {
      console.error(`Erro:${e}`);
    }
  }

  static async addUser(obj) {
    try {
      const existingUser = await users.findOne({
        $or: [{ username: obj.username }, { email: obj.email }],
      });
      if (existingUser) {
        console.log("User already exists:");
        return { status: "fail", message: "User Already exits" };
      } else {
        return await users.insertOne(obj);
      }
    } catch (e) {
      console.error(e);
    }
  }
};
