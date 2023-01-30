const express = require("express");
const router = express.Router();
const ContactService = require("../services/contact.service");
const service = new ContactService();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  getContactSchema,
  createContactSchema,
  updateContactSchema,
} = require("./../schemas/contact.schema");
const ValidatorHandler = require("../middlewares/validator.handler");
const config = require("../config/config");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user._id;
      const contacts = await service.getAllContacts(userId);
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  ValidatorHandler(getContactSchema, "params"),
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
  ValidatorHandler(createContactSchema, "body"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user._id;

      const body = req.body;
      const contact = await service.createContact(body, userId);

      res.status(201).json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  ValidatorHandler(getContactSchema, "params"),
  ValidatorHandler(updateContactSchema, "body"),
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
