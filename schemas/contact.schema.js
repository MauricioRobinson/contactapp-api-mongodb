const Joi = require("joi");

const id = Joi.string()
  .pattern(/^[a-z0-9]+$/i)
  .lowercase()
  .alphanum()
  .max(24);
const firstName = Joi.string()
  .pattern(/^[a-z]+$/i)
  .max(30)
  .trim();
const lastName = Joi.string()
  .pattern(/^[a-z]+$/i)
  .max(30)
  .trim();
const email = Joi.string().email().min(11).max(50).trim();
const phoneNumber = Joi.string().trim();
const isFavorite = Joi.boolean();

const getContactSchema = Joi.object({
  id: id.required(),
});

const createContactSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  phoneNumber: phoneNumber.required(),
  isFavorite,
});

const updateContactSchema = Joi.object({
  firstName,
  lastName,
  email,
  phoneNumber,
  isFavorite,
});

module.exports = { getContactSchema, createContactSchema, updateContactSchema };
