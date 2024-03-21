/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("userInitialRecords").del();
  await knex("userInitialRecords").insert([
    {
      id: 1,
      user_id: 1,
      height: 175, // cm
      initialWeight: 160, // lb
      targetWeight: 140, // lb
      targetDate: "2024-06-30",
    },
    {
      id: 2,
      user_id: 2,
      height: 180, // cm
      initialWeight: 180, // lb
      targetWeight: 160, // lb
      targetDate: "2024-07-15",
    },
  ]);
};
