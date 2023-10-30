const jwt = require("jsonwebtoken");

const User = require("../model/UserSchema");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      console.log("user not found");
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    requserID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized user");
  }
};

module.exports = Authenticate;
