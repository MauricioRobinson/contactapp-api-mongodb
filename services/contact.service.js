const Contact = require("../db/models/contact.model");
const boom = require("@hapi/boom");

class ContactService {
  constructor() {}

  async getAllContacts(userId) {
    const contacts = await Contact.find({ userId })
      .populate("userId", "firstName lastName email -_id")
      .sort({ createdAt: -1 });
    return contacts;
  }

  async getContact(id) {
    const contact = await Contact.findById(id);

    if (!contact) {
      throw boom.notFound("Contact not found");
    }

    return contact;
  }

  async createContact(data, userId) {
    const contact = await Contact.create({
      ...data,
      userId: userId,
    });

    return { contact, message: `${contact.firstName} has been added` };
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

    return {
      message: `${contact.firstName} ${contact.lastName} removed seccessfully`,
    };
  }
}

module.exports = ContactService;
