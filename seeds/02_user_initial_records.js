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
      height: 165, // cm
      initialWeight: 160, // lb
      initialDate: "2024-02-17",
      targetWeight: 120, // lb
      targetDate: "2024-10-30",
    },
    {
      id: 2,
      user_id: 2,
      height: 180, // cm
      initialWeight: 180, // lb
      initialDate: "2024-01-20",
      targetWeight: 150, // lb
      targetDate: "2024-07-15",
    },
  ]);
};
