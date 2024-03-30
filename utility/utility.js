const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));

const authorize = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Authorization header is required");
  }
  const token = authorization.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).send("Token is required");
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = payload;
    //check for account existance
    const { id } = req.decoded;
    const user = await knex("users").where({ id }).first();
    if (!user) {
      return res.status(404).json("Message: no such user");
    }
    next();
  } catch (e) {
    res.status(401).send(`${e}`);
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
