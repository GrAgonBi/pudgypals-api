const knex = require("knex")(require("../knexfile"));
const moment = require("moment");
const { formatDate } = require("../utility/utility");

const getAllWeights = async (req, res) => {
  const { id } = req.decoded;

  //get all weight records for current user
  try {
    const allRecords = await knex("weightRecords")
      .where({ user_id: id })
      .select(knex.raw("DATE_FORMAT(date, '%Y-%m-%d') AS date"), "weight");
    return res.status(200).json(allRecords);
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const get7daysWeights = async (req, res) => {
  const { id } = req.decoded;
  const sevenDaysAgo = moment().subtract(7, "days").format("YYYY-MM-DD");

  try {
    const weightRecords = await knex("weightRecords")
      .where("date", ">=", sevenDaysAgo) // Select records with date greater than or equal to 7 days ago
      .andWhere("date", "<=", formatDate()) // Select records with date less than or equal to today
      .andWhere({ user_id: id })
      .select(knex.raw("DATE_FORMAT(date, '%Y-%m-%d') AS date"), "weight");

    return res.status(200).json(weightRecords);
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const get30daysWeights = async (req, res) => {
  const { id } = req.decoded;

  const thirtyDaysAgo = moment().subtract(30, "days").format("YYYY-MM-DD");

  try {
    const weightRecords = await knex("weightRecords")
      .where("date", ">=", thirtyDaysAgo)
      .andWhere("date", "<=", formatDate())
      .andWhere({ user_id: id })
      .select(knex.raw("DATE_FORMAT(date, '%Y-%m-%d') AS date"), "weight");

    return res.status(200).json(weightRecords);
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const postWeight = async (req, res) => {
  const { id } = req.decoded;

  const { weight } = req.body;

  if (!weight || weight == 0) {
    return res.status(400).json("Please fill in requested weight value");
  }

  //insert record into db

  try {
    const today = formatDate();
    //check for exist records
    const result = await knex("weightRecords")
      .where({ user_id: id, date: today })
      .first();
    if (result) {
      return res
        .status(400)
        .json("It seems like you have already recorded your weight today.");
    }
    await knex("weightRecords").insert({
      user_id: id,
      weight,
      date: today,
    });

    return res.status(201).json("Message: weight is recorded successfully!");
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

module.exports = {
  getAllWeights,
  postWeight,
  get7daysWeights,
  get30daysWeights,
};
