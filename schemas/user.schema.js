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
const password = Joi.string()
  .min(8)
  .max(24)
  .pattern(/^[a-z0-9_*$+]+$/i);

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  firstName,
  lastName,
  email,
  password,
});

const loginUserSchema = Joi.object({
  firstName: firstName.required(),
  password: password.required(),
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
