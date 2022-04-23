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
        <Modal.Header closeButton>
          <BaseHeader title="Novo Usuário" />
        </Modal.Header>
        <Modal.Body>
          <BaseTextField label="Nome" />
          <BaseTextField label="Endereço" />
          <BaseTextField label="Cidade" />
          <BaseTextField label="Email" />
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
