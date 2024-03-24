const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));

const authorize = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  // console.log(token);

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = payload;
    // console.log(req.decoded);
    next();
  } catch (e) {
    res.status(401).send("Invalid auth token, please login again");
  }

  const { id } = req.decoded;
  //check for account
  try {
    const user = await knex("users").where({ id }).first();
    if (!user) {
      return res.status(404).json("Message: no such user");
    }
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const formatDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

module.exports = { authorize, formatDate };
