const router = require("express").Router();
const { authorize } = require("../controllers/authorize");
const { createProfile, getProfile } = require("../controllers/user-controller");

router.route("/").post(authorize, createProfile).get(authorize, getProfile);

module.exports = router;
