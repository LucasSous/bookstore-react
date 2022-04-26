import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { UsersContext } from '../../contexts/usersContext';

function BaseButton(props) {
  const { handleShow } = useContext(UsersContext);
  return (
    <Button onClick={handleShow} variant="success">
      {props.title}
    </Button>
  );
}

export default BaseButton;
