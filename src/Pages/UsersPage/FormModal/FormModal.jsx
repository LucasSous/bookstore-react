import BaseTextField from '../../../components/BaseTextField/BaseTextField';
import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { UsersContext } from '../../../contexts/usersContext';

function FormModal() {
  const {
    show,
    handleClose,
    nameHandler,
    addressHandler,
    cityHandler,
    emailHandler,
    nome,
    address,
    city,
    email,
    saveUser
  } = useContext(UsersContext);

  return (
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
      <Form>
        <Modal.Body>
          <BaseTextField label="Nome" value={nome} onChange={nameHandler} />
          <BaseTextField label="Endereço" value={address} onChange={addressHandler} />
          <BaseTextField label="Cidade" value={city} onChange={cityHandler} />
          <BaseTextField label="Email" value={email} onChange={emailHandler} />
        </Modal.Body>
        <div className="d-flex justify-content-center pb-3">
          <BaseButtonForm title="Close" color="red" click={handleClose} />
          <BaseButtonForm title="Salvar" color="blue" click={saveUser} />
        </div>
      </Form>
    </Modal>
  );
}

export default FormModal;
