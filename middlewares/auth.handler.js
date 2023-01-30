const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../db/models/user.model");

const AuthHandler = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, config.jwtSecret);

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Rquest is not authorized" });
  }
};

module.exports = { AuthHandler };
