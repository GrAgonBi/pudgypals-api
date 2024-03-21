/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      password: "$2a$10$tPfeUm/6XEFsZTs8vbm1EeGB6HWhCDSjtEzcK0OmO9.GaMG4gjjPG",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      password: "$2a$10$uEfEWONOwDHDoqmDhdYoSOF7ioBpC5Y3xItQwPUsKMpu4oT2el8Rq",
    },
  ]);
};
