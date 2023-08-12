const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_ACCESS_EXPIRES = Number(process.env.JWT_ACCESS_EXIRATION_TIME_IN_SECONDS); 
const JWT_REFRESH_EXPIRES = Number(process.env.JWT_REFRESH_EXIRATION_TIME_IN_SECONDS);

const generateToken = ({ userId, expirationTimeInSeconds }) => {
  return jwt.sign({ sub: { userId } }, JWT_SECRET, {
    expiresIn: expirationTimeInSeconds,
  });
};

const generateTokens = ({ userId }) => {
  const access = generateToken({
    userId,
    expirationTimeInSeconds: JWT_ACCESS_EXPIRES,
  });

  const refresh = generateToken({
    userId,
    expirationTimeInSeconds: JWT_REFRESH_EXPIRES,
  });

  return [access, refresh];
};

const verifyToken = ({ token }) => {
  return jwt.verify(token, JWT_SECRET);
};

const decodeToken = ({ token }) => {
  return jwt.decode(token);
};

const comparePasswords = async (hash, password) => {
  try {
    const match = await argon2.verify(hash, password);
    return match;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

module.exports = {
  generateTokens,
  verifyToken,
  decodeToken,
  comparePasswords,

};
