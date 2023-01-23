const mongoose = require("mongoose");
const ContactSchema = require("./../schemas/contact.schema");

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
