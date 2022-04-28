import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel, Button } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { UsersContext } from '../../../contexts/usersContext';
import { useForm } from 'react-hook-form';

function FormModal() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {
    show,
    handleClose,
    nameHandler,
    addressHandler,
    cityHandler,
    emailHandler,
    name,
    address,
    city,
    email,
    saveUser,
    titleForm
  } = useContext(UsersContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Row className="px-3 pt-3 pb-2">
        <Col>
          <BaseHeader title={titleForm} />
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <span onClick={handleClose} className="material-symbols-outlined close-icon">
            close
          </span>
        </Col>
      </Row>
      <Form onSubmit={saveUser}>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
            <Form.Control type="text" placeholder=".." value={name} onChange={nameHandler} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Endereço" className="mb-3">
            <Form.Control type="text" placeholder=".." value={address} onChange={addressHandler} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Cidade" className="mb-3">
            <Form.Control type="text" placeholder=".." value={city} onChange={cityHandler} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <Form.Control type="text" placeholder=".." value={email} onChange={emailHandler} />
          </FloatingLabel>
        </Modal.Body>
        <div className="d-flex justify-content-center pb-3">
          <BaseButtonForm title="Cancelar" color="red" click={handleClose} />
          <Button variant="ligth" type="submit">
            <span>Salvar</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default FormModal;
