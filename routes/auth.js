const router = require("express").Router();
const {
  register,
  login,
  getAccount,
} = require("../controllers/auth-controller");
const { authorize } = require("../utility/utility");

router.post("/register", register);
router.post("/login", login);
router.get("/account", authorize, getAccount);

module.exports = router;
