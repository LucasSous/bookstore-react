import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel, Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { BooksContext } from '../../../contexts/booksContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputError from '../../../components/InputError/InputError.jsx';

function FormModal() {
  const validationSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    endereco: yup.string().required('Campo obrigatório!'),
    cidade: yup.string().required('Campo obrigatório!'),
    email: yup.string().required('Campo obrigatório!').email('Informe um e-mail válido')
  });

  const { show, handleClose } = useContext(BooksContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  function calcelForm() {
    handleClose();
  }

  return (
    <Modal show={show} onHide={calcelForm}>
      <Row className="px-3 pt-3 pb-2">
        <Col>
          <BaseHeader title="Novo Livro" />
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <span onClick={calcelForm} className="material-symbols-outlined close-icon">
            close
          </span>
        </Col>
      </Row>
      <Form>
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
            <Form.Select>
              <option></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            {errors?.endereco && <InputError message={errors.editora?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Altor*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="autor"
              {...register('autor')}
              className={errors?.autor && 'errorCity'}
            />
            {errors?.autor && <InputError message={errors.autor?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Ano de Lançamento*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="lancamento"
              {...register('lancamento')}
              className={errors?.lancamento && 'errorlancamento'}
            />
            {errors?.lancamento && <InputError message={errors.lancamento?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Quantidade*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="quantidade"
              {...register('quantidade')}
              className={errors?.quantidade && 'errorquantidade'}
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
