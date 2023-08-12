const router = require("express").Router();
const { authorizedUser } = require("../../middlewares/auth");
const { getUsers, login, refreshTokens, verify } = require("./controller");

router
  .get("/auth", authorizedUser, getUsers)
  .post("/auth/login", login)
  .get("/auth/refresh", refreshTokens)
  .get("/auth/verify", verify);

module.exports = router;
