const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const payload = user

  const secretKey = process.env.JWT_SECRET;
  const expiresIn = process.env.TOKEN_EXPIRATION 

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

module.exports = generateToken;
