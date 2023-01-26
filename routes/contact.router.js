const express = require("express");
const router = express.Router();
const ContactService = require("../services/contact.service");
const service = new ContactService();
const passport = require("passport");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const contact = await service.getContact(id);

      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const body = req.body;
      const contact = await service.createContact(body);

      res.status(201).json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const contact = await service.updateContact(id, body);

      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const contact = await service.deleteContact(id);

      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
