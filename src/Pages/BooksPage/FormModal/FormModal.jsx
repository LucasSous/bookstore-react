import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { BooksContext } from '../../../contexts/booksContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputError from '../../../components/InputError/InputError.jsx';
import api from '../../../services/api';
import './FormModal.css';

function FormModal() {
  const validationSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    editora: yup.string().required('Campo obrigatório!'),
    autor: yup.string().required('Campo obrigatório!'),
    lancamento: yup
      .number()
      .required('Campo obrigatório!')
      .positive('O número deve ser positivo')
      .integer('O número deve ser inteiro')
      .min(1000, 'Ano inválido')
      .max(new Date().getFullYear(), 'Ano inválido'),
    quantidade: yup
      .number()
      .required('Campo obrigatório!')
      .positive('O número deve ser positivo')
      .integer('O número deve ser inteiro')
  });

  const { show, handleClose, saveBook, titleForm, bookDefaultFormValues, selectValue, setSelectValue } =
    useContext(BooksContext);

  const [publishers, setPublishers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: bookDefaultFormValues,
    resolver: yupResolver(validationSchema)
  });

  function calcelForm() {
    handleClose();
    reset(bookDefaultFormValues);
  }

  useEffect(() => {
    getPublishers();
  }, []);

  const getPublishers = () => {
    api.get('editoras').then(({ data }) => {
      setPublishers(data);
    });
  };

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
      <Form onSubmit={handleSubmit(saveBook)}>
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

          <FloatingLabel controlId="floatingInput" label="Editora*" className="mb-4">
            <Form.Select
              value={selectValue}
              name="editora"
              {...register('editora')}
              onChange={(e) => setSelectValue(e.target.value)}
              className={errors?.editora && 'errorPublisher'}>
              <option></option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.nome}
                </option>
              ))}
            </Form.Select>
            {errors?.editora && <InputError message={errors.editora?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Autor*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="autor"
              {...register('autor')}
              className={errors?.autor && 'errorAuthor'}
            />
            {errors?.autor && <InputError message={errors.autor?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Ano de Lançamento*" className="mb-4">
            <Form.Control
              type="number"
              placeholder=".."
              name="lancamento"
              {...register('lancamento')}
              className={errors?.lancamento && 'errorReleaseYear'}
            />
            {errors?.lancamento && <InputError message={errors.lancamento?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Quantidade*" className="mb-4">
            <Form.Control
              type="number"
              placeholder=".."
              name="quantidade"
              {...register('quantidade')}
              className={errors?.quantidade && 'errorQuantity'}
            />
            {errors?.quantidade && <InputError message={errors.quantidade?.message} />}
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
