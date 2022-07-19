import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

export default function SignIn({ onIdSubmit }) {
  // instead of onchange, use a useRef hook to keep track.
  // References input control to know what value
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type="submit" className="mr-2">
          Sign In
        </Button>
        <Button onClick={createNewId} variant="secondary">
          Create a New id
        </Button>
      </Form>
    </Container>
  );
}
