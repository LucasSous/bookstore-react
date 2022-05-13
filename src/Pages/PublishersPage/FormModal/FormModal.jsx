import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import React, { useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { PublishersContext } from '../../../contexts/publishersContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputError from '../../../components/InputError/InputError.jsx';
import './FormModal.css';

function FormModal() {
  const validationSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    cidade: yup.string().required('Campo obrigatório!')
  });

  const { show, handleClose, savePublisher, titleForm, publisherDefaultFormValues } = useContext(PublishersContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: publisherDefaultFormValues,
    resolver: yupResolver(validationSchema)
  });

  function calcelForm() {
    handleClose();
    reset(publisherDefaultFormValues);
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
      <Form onSubmit={handleSubmit(savePublisher)}>
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
