const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserService = require("./../services/user.service");
const service = new UserService();
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require("./../schemas/user.schema");
const ValidatorHandler = require("./../middlewares/validator.handler");
const cookie = require("cookie");

router.get("/", async (req, res, next) => {
  try {
    const users = await service.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  ValidatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.getUser(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

//Login user router
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.loginUser(email, password);
    const token = await service.signToken(
      user.id,
      user.firstName,
      user.lastName
    );

    const authCookie = cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
    });

    res.status(201).header("Set-Cookie", authCookie).json({ email, token });
  } catch (error) {
    next(error);
  }
});

//Sigup user router
router.post(
  "/signup",
  ValidatorHandler(createUserSchema, "body"),
  // passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const body = req.body;
    try {
      const user = await service.signupUser(body);
      const token = await service.signToken(
        user.id,
        user.firstName,
        user.lastName
      );

      const authCookie = await cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60,
      });

      res.status(201).header("Set-Cookie", authCookie).json({ email, token });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  ValidatorHandler(getUserSchema, "params"),
  ValidatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const user = await service.updateUser(id, body);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await service.deleteUser(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
