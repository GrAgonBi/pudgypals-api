// const bycrypt = require("bcryptjs");

// // console.log("user1:", bycrypt.hashSync("user1"));
// // console.log("user2:", bycrypt.hashSync("user2"));
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

//access the req body
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to App");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`); // may need change url when deployed
});
