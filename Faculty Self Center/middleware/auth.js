const jwt = require("jsonwebtoken");
const config = require("config");
const { model } = require("mongoose");

//middleware function
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //chck if no token
  if (!token) {
    return res.status(400).json({ msg: "No token , authorization denied" });
  }

  //verify token

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.faculty = decoded.faculty;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is invalid" });
  }
};
