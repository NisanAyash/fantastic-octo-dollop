const router = require("express").Router();
const { authorizedUser } = require("../../middlewares/auth");
const { getReports } = require("./controller");

router.get("/reports", authorizedUser ,getReports);

module.exports = router;
