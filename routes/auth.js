const router = require("express").Router();
const { register, login } = require("../controllers/user-controller");

//test for initial setup
router.route("/").get((req, res) => {
  res.send("Welcome to auth");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
