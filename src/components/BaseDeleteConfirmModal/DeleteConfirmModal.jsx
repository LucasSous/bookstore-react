import './DeleteConfirmModal.css';
import { Modal } from 'react-bootstrap';
import BaseButtonForm from '../BaseButtonForm/BaseButtonForm.jsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';

function DeleteConfirmModal(props) {
  const { modalTheme } = useContext(GlobalContext);

  return (
    <Modal size="sm" show={props.show} onHide={props.onHide} className={`${modalTheme}`}>
      <Modal.Body>
        <h1 className="d-flex justify-content-center title">DELETAR</h1>
        <p className="message">{props.message}</p>
      </Modal.Body>
      <div className="d-flex justify-content-center pb-3">
        <BaseButtonForm title="Cancelar" color="red" click={props.clickCancel} />
        <BaseButtonForm title="Confirmar" color="blue" click={props.clickConfirm} />
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;
