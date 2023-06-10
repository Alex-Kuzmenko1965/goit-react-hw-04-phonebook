// import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { useState } from 'react';
import { nanoid } from "nanoid";
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';

const LS_CONTACTS = 'contacts';
const contactsDefault = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];

export default function App() {
  const [contacts, setContacts] = useLocalStorage(LS_CONTACTS, contactsDefault);
  const [filter, setFilter] = 
  useState('');
  
  const onSubmit = ({ name, number }) => {    
    const contactId = nanoid();
    const nameForm = name;
    const numberForm = number;    
    const isName = contacts.find(contact => contact.name === nameForm);
    if (isName) {
      alert(`${name} is already in contact`);
      return;
    }
    const contact = {id: contactId, name: nameForm, number: numberForm};
    setContacts(prevState => ([...prevState, contact]));   
  };
    
  const deleteContact = contactId => {    
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)))
  };
    
  const searchQuery = ({ target }) => {
    const searchQuery = target.value;    
    setFilter(searchQuery);
  }

  const getFilteredContacts = () => {
    return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()));      
  }

  return (
    <div>
      <h1>Phonebook</h1>      
      <ContactForm
      onSubmit = {onSubmit} />     
      <h2>Contacts</h2>
      <Filter
      filter = {filter}
      searchQuery = {searchQuery} />
      <ContactList
      getFilteredContacts = {getFilteredContacts()}
      deleteContact = {deleteContact} />
    </div>
  );
}
