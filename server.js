require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const authRouter = require("./routes/auth");

//access the req body
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

//test for initial setup
app.get("/", (req, res) => {
  return res.send("Welcome to App");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`); // may need change url when deployed
});
