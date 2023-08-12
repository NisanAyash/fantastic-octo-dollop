const { verifyToken } = require("../utils");

const authorizedUser = (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.sendStatus(401);
  }

  const access_token = authorization.split(" ")[1];

  if (!access_token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = verifyToken({ token: access_token });
    req.userId = decoded.sub.userId;

    return next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

const authorizedAdmin = () => {};

module.exports = {
  authorizedUser,
};
