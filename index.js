const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const contactsList = await contacts.listContacts();
        console.log(contactsList);
        break;

      case 'get':
        const oneContact = await contacts.getContactById(id);
        console.log(oneContact);
        break;

      case 'add':
        const newContact = await contacts.addContact({ name, email, phone });
        console.log(newContact);
        break;

      case 'remove':
        const deleteContact = await contacts.removeContact(id);
        console.log(deleteContact);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

invokeAction(argv);