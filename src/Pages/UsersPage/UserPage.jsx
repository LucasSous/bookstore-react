import './UserPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import UsersList from './List/UsersList.jsx';
import BaseButton from '../../components/BaseButton/BaseButton';
import { Col, Row, Modal } from 'react-bootstrap';
import BaseSearch from '../../components/BaseSearch/BaseSearch';
import React, { useState } from 'react';
import BaseTextField from '../../components/BaseTextField/BaseTextField';
import BaseButtonForm from '../../components/BaseButtonForm/BaseButtonForm';

function UserPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userEmail, setUserEmail] = useState('');

  return (
    <div className="user-page">
      <Row>
        <Col>
          <BaseHeader title="Usuários" />
        </Col>
        <Col className="d-flex justify-content-end actions">
          <BaseSearch />
          <BaseButton click={handleShow} title="Adicionar Usuário" />
        </Col>
      </Row>
      <UsersList />
      {/*open modal-------------------------*/}
      <Modal show={show} onHide={handleClose}>
        <Row className="px-3 pt-3 pb-2">
          <Col>
            <BaseHeader title="Novo Usuário" />
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <span onClick={handleClose} className="material-symbols-outlined close-icon">
              close
            </span>
          </Col>
        </Row>
        <Modal.Body>
          <BaseTextField label="Nome" onChange={setUserName} />
          <BaseTextField label="Endereço" onChange={setUserAddress} />
          <BaseTextField label="Cidade" onChange={setUserCity} />
          <BaseTextField label="Email" onChange={setUserEmail} />
        </Modal.Body>
        <div className="d-flex justify-content-center pb-3">
          <BaseButtonForm title="Close" color="red" click={handleClose} />
          <BaseButtonForm title="Salvar" color="blue" click={handleClose} />
        </div>
      </Modal>
      {/*close modal------------------------*/}
    </div>
  );
}

export default UserPage;
