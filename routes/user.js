const router = require("express").Router();
const { authorize } = require("../utility/utility");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/user-controller");

router
  .route("/")
  .post(authorize, createProfile)
  .get(authorize, getProfile)
  .put(authorize, updateProfile)
  .delete(authorize, deleteAccount);

module.exports = router;
