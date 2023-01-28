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
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await service.loginUser(email, password);
      const token = await service.signToken(
        user.id,
        user.firstName,
        user.lastName
      );

      res.status(201).json({ email, token });
    } catch (error) {
      next(error);
    }
  }
);

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

      res.status(201).json({ user, token });
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
