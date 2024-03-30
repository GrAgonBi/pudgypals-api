const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  //check for required fields
  if (!username || !email || !password) {
    return res.status(400).json("Please enter the required fields");
  }

  //insert into database and send back a jwt token
  try {
    //check for existed username and email
    const existedUsername = await knex("users")
      .where({ username: username })
      .first();
    const existedEmail = await knex("users").where({ email: email }).first();
    if (existedUsername || existedEmail) {
      return res
        .status(400)
        .json(
          `${
            existedUsername
              ? existedEmail
                ? "Username and email already exist"
                : "Username already exists"
              : "Email already exists"
          } `
        );
    }

    //insert into db
    await knex("users").insert({
      username,
      email,
      password: bcrypt.hashSync(password),
    });

    //get new user from db
    const newUser = await knex("users").where({ username: username }).first();

    //generate jwt token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //checking for required fields
  if (!email || !password) {
    return res.status(400).json("Please enter the required fields");
  }

  try {
    //find the user
    const user = await knex("users").where({ email: email }).first();

    if (!user) {
      return res.status(401).json("Invalid email");
    }
    // checking password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json("Invalid password");
    }
    //generate jwt token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

const getAccount = async (req, res) => {
  const { id } = req.decoded;
  //get account info
  try {
    const user = await knex("users").where({ id }).first();
    return res.status(200).json({ username: user.username, email: user.email });
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

module.exports = { register, login, getAccount };
