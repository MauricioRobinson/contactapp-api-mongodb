const Joi = require("joi");

const id = Joi.string()
  .lowercase()
  .alphanum()
  .length(24)
  .pattern(/^[a-f0-9]+$/i);
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
const userId = Joi.string()
  .pattern(/^[a-z0-9]+$/i)
  .lowercase()
  .alphanum()
  .length(24);

const getContactSchema = Joi.object({
  id: id.required(),
});

const createContactSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  phoneNumber: phoneNumber.required(),
  isFavorite,
  userId,
});

const updateContactSchema = Joi.object({
  firstName,
  lastName,
  email,
  phoneNumber,
  isFavorite,
  userId,
});

module.exports = { getContactSchema, createContactSchema, updateContactSchema };
