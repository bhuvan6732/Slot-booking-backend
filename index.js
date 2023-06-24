const app = require("./server.js");
const mongodb = require("mongodb");
const dotenv = require("dotenv");

const AdminDAO = require("./dao/Admin.js");
const UsersDAO = require("./dao/User.js");
const VaccineDao = require("./dao/Vaccine.js");
const slotsDAO = require("./dao/slots.js");

async function main() {
  dotenv.config({ path: "./file.env" });
  const client = new mongodb.MongoClient(process.env.MONOGODB_CONNECT_URI);
  const port = process.env.port || 5000;

  try {
    await client.connect().then(console.log("db connected"));
    await AdminDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    await VaccineDao.injectDB(client);
    await slotsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
}
main().catch(console.error);
