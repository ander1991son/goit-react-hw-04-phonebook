import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert(`The contact ${name} already exists!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContact])
      );

      setContacts(prevContacts => [...prevContacts, newContact]);
      setName('');
      setNumber('');
    }
  };
  const handleTofind = event => {
    const { value } = event.target;
    setFilter(value.toLowerCase());
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <h1 style={{ paddingLeft: '4%' }}>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <h2 style={{ paddingLeft: '4%' }}>Contacts</h2>
      <Filter filter={filter} handleTofind={handleTofind} />
      <ContactList
        contacts={contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

///////////////////////////////////////                                            codigo de abajo original
// import React, { Component } from 'react';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// import Filter from './Filter/Filter';
// import { nanoid } from 'nanoid';

// export class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       contacts: [
//         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//         { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//       ],
//       filter: '',
//       name: '',
//       number: '',
//     };
//   }

//   componentDidMount() {
//     const storedContacts = localStorage.getItem('contacts');

//     if (storedContacts) {
//       this.setState({ contacts: JSON.parse(storedContacts) });
//     }
//   }

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { name, number, contacts } = this.state;

//     // Verificar si el nombre ya está en la lista
//     const nameExists = contacts.some(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (nameExists) {
//       alert(`The contact ${name} already exists!`);
//     } else {
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };

//       // Guardar en localStorage
//       localStorage.setItem(
//         'contacts',
//         JSON.stringify([...contacts, newContact])
//       );

//       this.setState(prevState => ({
//         contacts: [...prevState.contacts, newContact],
//         name: '',
//         number: '',
//       }));
//     }
//   };

//   handleTofind = event => {
//     const { value } = event.target;
//     this.setState({
//       filter: value.toLowerCase(),
//     });
//   };

//   handleDeleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter, name, number } = this.state;

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );

//     return (
//       <div>
//         <h1 style={{ paddingLeft: '4%' }}>Phonebook</h1>
//         <ContactForm
//           name={name}
//           number={number}
//           handleInputChange={this.handleInputChange}
//           handleSubmit={this.handleSubmit}
//         />

//         <h2 style={{ paddingLeft: '4%' }}>Contacts</h2>
//         <Filter filter={filter} handleTofind={this.handleTofind} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.handleDeleteContact}
//         />
//       </div>
//     );
//   }
// }
