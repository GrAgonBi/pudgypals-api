const bycrypt = require("bcryptjs");

console.log("user1:", bycrypt.hashSync("user1"));
console.log("user2:", bycrypt.hashSync("user2"));
