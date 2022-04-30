import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel, Button } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { UsersContext } from '../../../contexts/usersContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputError from '../../../components/InputError/InputError.jsx';
import api from '../../../services/api';

function FormModal() {
  const validationSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    endereco: yup.string().required('Campo obrigatório!'),
    cidade: yup.string().required('Campo obrigatório!'),
    email: yup.string().required('Campo obrigatório!').email('Informe um e-mail válido')
  });

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
    titleForm,
    id
  } = useContext(UsersContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nome: '',
      endereco: '',
      cidade: '',
      email: ''
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (id) {
      getUser();
    }
  });

  const getUser = () => {
    api.get(`usuario/${id}`).then(({ data }) => {
      reset(data);
      console.log(data);
    });
  };

  function calcelSave() {
    handleClose();
    reset({ nome: '', endereco: '', cidade: '', email: '' });
  }

  function onError(error) {
    console.log(error);
  }

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
      <Form onSubmit={handleSubmit(saveUser, onError)}>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Nome*" className="mb-4">
            <Form.Control type="text" placeholder=".." name="nome" {...register('nome')} />
            {errors?.nome && <InputError message={errors.nome?.message} />}
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Endereço*" className="mb-4">
            <Form.Control type="text" placeholder=".." name="endereco" {...register('endereco')} />
            {errors?.endereco && <InputError message={errors.endereco?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Cidade*" className="mb-4">
            <Form.Control type="text" placeholder=".." name="cidade" {...register('cidade')} />
            {errors?.cidade && <InputError message={errors.cidade?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Email*" className="mb-4">
            <Form.Control type="text" placeholder=".." name="email" {...register('email')} />
            {errors?.email && <InputError message={errors.email?.message} />}
          </FloatingLabel>
        </Modal.Body>
        <div className="d-flex justify-content-center pb-3">
          <BaseButtonForm title="Cancelar" type="button" color="red" click={calcelSave} />
          <BaseButtonForm title="Salvar" type="submit" color="blue" />
        </div>
      </Form>
    </Modal>
  );
}

export default FormModal;
