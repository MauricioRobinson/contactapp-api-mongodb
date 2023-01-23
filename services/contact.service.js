const Contact = require("../db/models/contact.model");
const boom = require("@hapi/boom");

class ContactService {
  constructor() {}

  async getAllContacts() {
    const contacts = await Contact.find();
    return contacts;
  }

  async getContact(id) {
    const contact = await Contact.findById(id);

    if (!contact) {
      throw boom.notFound("Contact not found");
    }

    return contact;
  }

  async createContact(data) {
    const contact = await Contact.create(data);

    return contact;
  }

  async updateContact(id, data) {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    // const updateContact = await contact.update(data, { new: true });

    return contact;
  }

  async deleteContact(id) {
    const contact = await Contact.findByIdAndRemove(id);
    // const deletedContact = contact.deleteOne(contact);

    return contact;
  }
}

module.exports = ContactService;
