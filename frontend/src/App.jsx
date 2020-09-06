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

  render() {
    return (
      <div>
        <Route
          exact path='/'
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact} />
          )} />
        <Route
          path='/create'
          component={CreateContact}
        />
      </div>
    );
  }
}

export default App;
