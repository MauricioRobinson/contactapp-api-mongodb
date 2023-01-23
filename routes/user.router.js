const express = require("express");
const router = express.Router();
const UserService = require("./../services/user.service");
const service = new UserService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getUser(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.createUser(body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.updateUser(id, body);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.deleteUser(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
