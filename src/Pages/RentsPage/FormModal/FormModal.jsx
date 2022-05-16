import BaseButtonForm from '../../../components/BaseButtonForm/BaseButtonForm';
import { Modal, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import React, { useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import { RentsContext } from '../../../contexts/rentsContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputError from '../../../components/InputError/InputError.jsx';
import './FormModal.css';
import { GlobalContext } from '../../../contexts/globalContext';

function FormModal() {
  const validationSchema = yup.object().shape({
    usuario: yup.string().required('Campo obrigatório!'),
    livro: yup.string().required('Campo obrigatório!'),
    data_aluguel: yup.string().required('Campo obrigatório!'),
    data_previsao: yup.string().required('Campo obrigatório!'),
    data_devolucao: yup.string().required('Campo obrigatório!')
  });

  const { modalTheme } = useContext(GlobalContext);

  const { show, handlerClose, saveRent, titleForm, rentDefaultFormValues, selectValue, setSelectValue, rents } =
    useContext(RentsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: rentDefaultFormValues,
    resolver: yupResolver(validationSchema)
  });

  function calcelForm() {
    handlerClose();
    reset(rentDefaultFormValues);
  }

  return (
    <Modal show={show} onHide={calcelForm} className={`${modalTheme}`}>
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
      <Form onSubmit={handleSubmit(saveRent)}>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="usuário*" className="mb-4">
            <Form.Select name="usuario" {...register('usuario')} className={errors?.usuario && 'errorUser'}>
              <option value="">Selecione um Usuário</option>
              {rents.map((user) => (
                <option key={user.usuario_id.id} value={user.usuario_id.id}>
                  {user.usuario_id.nome}
                </option>
              ))}
            </Form.Select>
            {errors?.usuario && <InputError message={errors.usuario?.message} />}
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="livro*" className="mb-4">
            <Form.Select name="livro" {...register('livro')} className={errors?.livro && 'errorBook'}>
              <option value="">Selecione um Livro</option>
              {rents.map((book) => (
                <option key={book.livro_id.id} value={book.livro_id.id}>
                  {book.livro_id.nome}
                </option>
              ))}
            </Form.Select>
            {errors?.livro && <InputError message={errors.livro?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Data de Aluguél*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="data_aluguel"
              {...register('data_aluguel')}
              className={errors?.data_aluguel && 'errorAuthor'}
            />
            {errors?.data_aluguel && <InputError message={errors.data_aluguel?.message} />}
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Data de Previsão de entrega*" className="mb-4">
            <Form.Control
              type="text"
              placeholder=".."
              name="data_previsao"
              {...register('data_previsao')}
              className={errors?.data_previsao && 'errorReleaseYear'}
            />
            {errors?.data_previsao && <InputError message={errors.data_previsao?.message} />}
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
