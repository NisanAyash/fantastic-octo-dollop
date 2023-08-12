const express = require("express");
const app = express();
// const cors = require("cors");
const path = require("path");
const API_VERSION = "/api/v1/";

const authRouter = require("./services/auth/view");
const reportRouter = require("./services/reports/view");

app.use(express.json());
// app.use(cors());

app.use(API_VERSION, authRouter);
app.use(API_VERSION, reportRouter);

app.get("/_healthz", (_, res) => {
  res.send("ok");
});

app.use(express.static(path.join(__dirname, "build")));

app.use("*", (request, response, next) => {
  const path = path.join(__dirname, "build", "index.html");
  return response.sendFile(path);
});

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
