const pkg = require("mongoose");
const { connect, connection } = pkg;

const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connect", () => {
  console.log("Database connection successful");
});

connection.on("err", (err) => {
  console.log(`Database connection failed: ${err.message}`);
});

connection.on("disconnected", () => {
  console.log("Database disconnected successful");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Connection DB closed");
  process.exit(1);
});

module.exports = db;
