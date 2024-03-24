const knex = require("knex")(require("../knexfile"));

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
  const { height, initialWeight, initialDate, targetWeight, targetDate } =
    req.body;

  //check for required fields
  if (
    !height ||
    !initialWeight ||
    !initialDate ||
    !targetWeight ||
    !targetDate
  ) {
    return res.status(400).json("Please fill all required fields");
  }

  //insert into db
  try {
    //insert into userInitialRecords table
    await knex("userInitialRecords").insert({
      user_id: id,
      height,
      initialWeight,
      initialDate,
      targetWeight,
      targetDate,
    });

    //insert into weightRecords table
    await knex("weightRecords").insert({
      user_id: id,
      weight: initialWeight,
      date: initialDate,
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
        "users.email",
        "userInitialRecords.height",
        "userInitialRecords.initialWeight",
        knex.raw(
          "DATE_FORMAT(userInitialRecords.initialDate, '%Y-%m-%d') as initialDate"
        ),
        "userInitialRecords.targetWeight",
        knex.raw(
          "DATE_FORMAT(userInitialRecords.targetDate, '%Y-%m-%d') as targetDate"
        )
      )
      .first();

    if (!profile) {
      return res.status(404).json("Message: User profile not found");
    }

    res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.decoded;
  //check for account
  try {
    const user = knex("users").where({ id }).first();
    if (!user) {
      return res.status(404).json("Message: no such user");
    }
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
  const { targetWeight, targetDate } = req.body;

  try {
    const updatedProfile = await knex("userInitialRecords")
      .where({ user_id: id })
      .update({ targetWeight, targetDate });

    if (updatedProfile === 0) {
      return res.status(404).json("Message: User profile not found");
    }

    // const updatedWeightRecords = await knex("weightRecords")
    //   .where({ user_id: id })
    //   .first()
    //   .update({ weight: initialWeight, date: initialDate });

    // if (updatedWeightRecords === 0) {
    //   return res.status(404).json("Message: Weight record not found");
    // }
    return res.status(204).json("Message: Profile has been updated");
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.decoded;

  try {
    //delete user account for given id
    const deletedRow = await knex("users").where({ id }).del();

    if (deletedRow === 0) {
      return res.status(404).json("Message: No such user account");
    }

    return res.status(204).json("Message: User account deleted successfully.");
  } catch (e) {
    return res.status(500).json(`Message: ${e}`);
  }
};

module.exports = { createProfile, getProfile, updateProfile, deleteAccount };
