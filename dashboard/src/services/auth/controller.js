const {
  generateTokens,
  comparePasswords,
  verifyToken,
  decodeToken,
} = require("../../utils");
const Auth = require("./model");

const getUsers = async (req, res, next) => {
  try {
    const users = await Auth.getUsers();
    res.send({ users });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("Email and Password are required");
  }

  try {
    const user = await Auth.getUserByEmail({ email });
    const match = await comparePasswords(user.hash, password);

    if (!match) {
      return res.status(401).send("Please check your creiditals");
    }

    const userId = user.UserID;

    const [accessToken, refreshToken] = generateTokens({
      userId,
    });

    Auth.setRefreshToken({ userId, refreshToken });

    return res.send({
      accessToken,
      refreshToken,
      user: {
        UserID: user.UserID,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

const refreshTokens = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.sendStatus(401);
  }

  const _access_token = authorization?.split(" ")[1];

  if (!_access_token) {
    return res.sendStatus(401);
  }

  const x_refresh_token = req.headers["x-refresh-token"];

  if (!x_refresh_token) {
    return res.sendStatus(401);
  }

  const refresh_token = x_refresh_token.split(" ")[1];

  if (!refresh_token) {
    return res.sendStatus(401);
  }

  try {
    const verify_access_token = verifyToken({ token: _access_token });
    return res.send({ decoded: verify_access_token });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const decoded = decodeToken({ token: refresh_token });
        const userId = decoded.sub.userId;
        const user = await Auth.getUserById({ userId });

        // check if the refresh token has changed (as I wrote before, in real world I'll use redis to get the refresh token of the spesific user)
        if (user.refreshToken !== refresh_token) {
          return res.status(401).send("Token has changed, who are you?");
        }

        const verify_refresh_token = verifyToken({ token: refresh_token });
        const [access_token, _] = generateTokens({ userId });

        return res.send({ access_token });
      } catch (error) {
        return res.status(409).send(error.message);
      }
    }

    return next(error);
  }
};

const verify = async (req, res, next) => {
  if (
    !req.headers["authorization"] ||
    !req.headers["authorization"].split(" ")[1]
  ) {
    return next(new Error("Missing Token"));
  }

  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = verifyToken({ token });
    const userId = decoded.sub.userId;
    const user = await Auth.getUserById({ userId });
    return res.send({ userId, user });
  } catch (error) {
    return next(error.message);
  }
};

module.exports = {
  getUsers,
  login,
  refreshTokens,
  verify,
};
