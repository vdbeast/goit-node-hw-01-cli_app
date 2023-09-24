const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname,'db','contacts.json');

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(data)
  } catch (error) {
      throw error;
  }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find(contact => contactId === contact.id) || null;
    } catch (error) {
        throw error;
  }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const updateContacts = contacts.filter(contacts => contacts.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
        return getContactById(contactId);
    } catch (error) {
        throw error;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { id: uuidv4(), name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}