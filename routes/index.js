const express = require("express");
const contactRouter = require("./contact.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/contacts", contactRouter);
}

module.exports = routerApi;
