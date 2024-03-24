const router = require("express").Router();
const { authorize } = require("../utility/utility");
const {
  getAllWeights,
  postWeight,
  get7daysWeights,
  get30daysWeights,
} = require("../controllers/weight-controller");

router.get("/all", authorize, getAllWeights);
router.get("/past7days", authorize, get7daysWeights);
router.get("/past30days", authorize, get30daysWeights);
router.post("/add", authorize, postWeight);

module.exports = router;
