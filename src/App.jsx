// import './App.css';
import React, { Component } from 'react';
import { nanoid } from "nanoid";
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';

const LS_CONTACTS = 'contacts';
export default class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''    
  }

  componentDidMount() {
    const saveContacts = localStorage.getItem(LS_CONTACTS);

    if (saveContacts) {
      const settingContacts = JSON.parse(saveContacts);
      this.setState({ contacts: settingContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = ({ name, number }) => {    
    const contactId = nanoid();       
    const contacts = this.state.contacts;
    const isName = contacts.find(contact => contact.name === name);
    if (isName) {
      alert(`${name} is already in contact`);
      return;
    }
    const contact = { id: contactId, name: name, number: number};            
    this.setState((prevState) => ({contacts: [...prevState.contacts, contact] }));   
  };
    
  deleteContact = contactId => {    
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
    
  searchQuery = ({ target }) => {
    const searchQuery = target.value;    
    this.setState({filter: searchQuery});
  }

  getFilteredContacts = () => {    
    const filter = this.state.filter;    
    const normalizedFilter = filter.toLowerCase();
    return this.state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter));      
  }

  render() {

  return (
    <div>
      <h1>Phonebook</h1>      
      <ContactForm
      handleSubmit = {this.handleSubmit} />     
      <h2>Contacts</h2>
      <Filter
      filter = {this.state.filter}
      searchQuery = {this.searchQuery} />
      <ContactList
      getFilteredContacts = {this.getFilteredContacts()}
      deleteContact = {this.deleteContact} />
    </div>
  );}
}
