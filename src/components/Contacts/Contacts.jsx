import React from 'react';
import { useContacts } from '../context/ContactsProvider';
import { ListGroup } from 'react-bootstrap';

export default function Contacts() {
  const { contacts } = useContacts();
  console.log('contacts', contacts);

  return (
    <ListGroup>
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
