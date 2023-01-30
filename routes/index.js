const express = require("express");
const contactRouter = require("./contact.router");
const userRouter = require("./user.router");
// const authRouter = require("./auth.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/contacts", contactRouter);
  router.use("/users", userRouter);
  // router.use("/auth", authRouter);
}

module.exports = routerApi;
