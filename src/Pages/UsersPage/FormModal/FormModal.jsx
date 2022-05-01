import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel, Button } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { UsersContext } from '../../../contexts/usersContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputError from '../../../components/InputError/InputError.jsx';
import './FormModal.css';

function FormModal() {
  const validationSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    endereco: yup.string().required('Campo obrigatório!'),
    cidade: yup.string().required('Campo obrigatório!'),
    email: yup.string().required('Campo obrigatório!').email('Informe um e-mail válido')
  });

  const { show, handleClose, saveUser, titleForm, userDefautFormValues } = useContext(UsersContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: userDefautFormValues,
    resolver: yupResolver(validationSchema)
  });

  function calcelForm() {
    handleClose();
    reset(userDefautFormValues);
  }

  return (
    <Modal show={show} onHide={calcelForm}>
      <Row className="px-3 pt-3 pb-2">
        <Col>
          <BaseHeader title={titleForm} />
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <span onClick={calcelForm} className="material-symbols-outlined close-icon">
            close
          </span>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(saveUser)}>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Nome*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="nome"
              {...register('nome')}
              className={errors?.nome && 'errorName'}
            />
            {errors?.nome && <InputError message={errors.nome?.message} />}
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Endereço*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="endereco"
              {...register('endereco')}
              className={errors?.endereco && 'errorAddress'}
            />
            {errors?.endereco && <InputError message={errors.endereco?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Cidade*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="cidade"
              {...register('cidade')}
              className={errors?.cidade && 'errorCity'}
            />
            {errors?.cidade && <InputError message={errors.cidade?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Email*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="email"
              {...register('email')}
              className={errors?.email && 'errorEmail'}
            />
            {errors?.email && <InputError message={errors.email?.message} />}
          </FloatingLabel>
        </Modal.Body>
        <div className="d-flex justify-content-center pb-3">
          <BaseButtonForm title="Cancelar" type="button" color="red" click={calcelForm} />
          <BaseButtonForm title="Salvar" type="submit" color="blue" />
        </div>
      </Form>
    </Modal>
  );
}

export default FormModal;
