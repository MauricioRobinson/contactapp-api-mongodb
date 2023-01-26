const express = require("express");
const router = express.Router();
const AuthService = require("./../services/auth.service");
const service = new AuthService();
const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const isAuth = await service.getUser(user.email, user.password);

      res.status(201).json(isAuth).redirect("/contacts");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
