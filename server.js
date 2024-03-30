require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const weightRouter = require("./routes/weights");

//access the req body
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/weight", weightRouter);

app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`); // may need change url when deployed
});
