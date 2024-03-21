const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  // console.log(token);

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = payload;
    // console.log(req.decoded);
    next();
  } catch (e) {
    res.status(401).send("Invalid auth token, please login again");
  }
};

module.exports = { authorize };
