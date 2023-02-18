import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Filter } from './Filter/Filter';
import { FormAddContact } from './FormAddConatact/FormAddContact';
import { PhonebookList } from './ContactBookList/ContactBookList';
import { Container } from './ConatactsStyles';
import toast, { Toaster } from 'react-hot-toast';

export const Contacts = () => {
  const [contacts, setConstacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContacts = data => {
    if (isDublicate(data)) {
      return toast.error(`${data.name} is already in contacts`);
    }
    setConstacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const isDublicate = ({ name }) => {
    const result = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    return Boolean(result);
  };
  const removeContacts = id => {
    setConstacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };
  const getFilterContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normolizedFilter = filter.toLocaleLowerCase();

    const filtredContacts = contacts.filter(({ name, number }) => {
      const normolizedName = name.toLocaleLowerCase();
      const normolizedNumber = number.toLocaleLowerCase();
      const result =
        normolizedName.includes(normolizedFilter) ||
        normolizedNumber.includes(normolizedFilter);
      return result;
    });
    return filtredContacts;
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const filteredContacts = getFilterContacts();
  return (
    <Container>
      <Toaster />
      <FormAddContact onSubmit={addContacts} />
      <Filter handleFilter={handleFilter} />
      <PhonebookList items={filteredContacts} removeContacts={removeContacts} />
    </Container>
  );
};
