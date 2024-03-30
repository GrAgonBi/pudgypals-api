/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("weightRecords").del();
  await knex("weightRecords").insert([
    { id: 1, user_id: 1, weight: 155, date: "2024-02-17" },
    { id: 2, user_id: 1, weight: 153, date: "2024-02-20" },
    { id: 3, user_id: 1, weight: 150, date: "2024-02-25" },
    { id: 4, user_id: 1, weight: 148, date: "2024-03-01" },
    { id: 5, user_id: 1, weight: 145, date: "2024-03-06" },
    { id: 6, user_id: 1, weight: 142, date: "2024-03-11" },
    { id: 7, user_id: 1, weight: 140, date: "2024-03-16" },
    { id: 8, user_id: 1, weight: 138, date: "2024-03-19" },
    { id: 9, user_id: 2, weight: 175, date: "2024-01-20" },
    { id: 10, user_id: 2, weight: 172, date: "2024-01-25" },
    { id: 11, user_id: 2, weight: 170, date: "2024-02-01" },
    { id: 12, user_id: 2, weight: 168, date: "2024-03-06" },
    { id: 13, user_id: 2, weight: 166, date: "2024-03-11" },
    { id: 14, user_id: 2, weight: 164, date: "2024-03-16" },
    { id: 15, user_id: 1, weight: 137, date: "2024-03-20" },
    { id: 16, user_id: 1, weight: 138, date: "2024-03-21" },
    { id: 17, user_id: 1, weight: 135, date: "2024-03-22" },
    { id: 18, user_id: 1, weight: 136, date: "2024-03-23" },
    { id: 19, user_id: 1, weight: 135.8, date: "2024-03-24" },
    { id: 20, user_id: 1, weight: 134.7, date: "2024-03-25" },
    { id: 21, user_id: 1, weight: 132.9, date: "2024-03-26" },
  ]);
};
