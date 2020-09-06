import React, { Component } from 'react';
import ListContacts from './ListContacts.jsx';
import CreateContact from './CreateContact.jsx'
import { Route } from 'react-router-dom';
import * as ContactsAPI from './utils/ContactsAPI.js';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then(contacts => {
        this.setState({
          contacts: contacts
        })
      })
  }

  removeContact = (contact) => {
    ContactsAPI.remove(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.filter((c) => (
            c.id !== contact.id
          ))
        }))
      })
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, contact]
        }))
      });

  }

  render() {
    return (
      <div>
        <Route
          exact path='/'
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact} />
          )}
        />
        <Route
          path='/create'
          render={({ history }) => (
            <CreateContact
              createContact={(contact) => {
                this.createContact(contact);
                history.push('/');
              }
              } />
          )}
        />
      </div>
    );
  }
}

export default App;
