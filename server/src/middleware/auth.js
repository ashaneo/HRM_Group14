const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

  if (!req.headers["authorization"]) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = req.headers["authorization"].split(' ')[1];
  
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


const hasPaygrade = (paygrades) => {
  return (req, res, next) => {
    const userGrade = req.user.paygrade;
    if (paygrades.includes(userGrade)){
      next();
    } else {
      return res.status(403).send("Incorrect user type. Not authorized.");
    }
  }
}

module.exports = {
  verifyToken,
  hasPaygrade
}