import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  try {
    const contacts = await readContacts();
    const newContacts = createFakeContact();
    const updatedContacts = [...contacts, newContacts];
    await writeContacts(updatedContacts);
    console.log('New contact added successfully.');
  } catch (error) {
    console.error('Error adding new contact:', error);
  }
};

addOneContact();
