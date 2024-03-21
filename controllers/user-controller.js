require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

//user3
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoidXNlcjMiLCJpYXQiOjE3MTA5OTM0MzQsImV4cCI6MTcxMTA3OTgzNH0.eIKoILaPoW5kpuNyr_y7QHBzMihBtPUkolOW7aTA9pw"
// }

const createProfile = async (req, res) => {
  //extract user id from req
  //req.decoded is defined from authorize middleware
  const { id } = req.decoded;

  //check for existed profile
  try {
    const existedUser = await knex("userInitialRecords")
      .where({ user_id: id })
      .first();
    if (existedUser) {
      return res.status(400).json("Profile already exist");
    }
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
  const { height, initialWeight, targetWeight, targetDate } = req.body;

  //check for required fields
  if (!height || !initialWeight || !targetWeight || !targetDate) {
    return res.status(400).json("Please fill all required fields");
  }

  //insert new profile into db
  try {
    await knex("userInitialRecords").insert({
      user_id: id,
      height,
      initialWeight,
      targetWeight,
      targetDate,
    });
    return res.status(201).json(`Profile is created`);
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const getProfile = async (req, res) => {
  const { id } = req.decoded;

  try {
    const profile = await knex("userInitialRecords")
      .join("users", "users.id", "userInitialRecords.user_id")
      .where({ user_id: id })
      .select(
        "users.username",
        "userInitialRecords.height",
        "userInitialRecords.initialWeight",
        "userInitialRecords.targetWeight",
        "userInitialRecords.targetDate"
      )
      .first();
    res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

module.exports = { createProfile, getProfile };
