import './DeleteConfirmModal.css';
import { Modal } from 'react-bootstrap';
import BaseButtonForm from '../BaseButtonForm/BaseButtonForm.jsx';

function DeleteConfirmModal(props) {
  return (
    <Modal size="sm" show={props.show} onHide={props.onHide}>
      <div className="d-flex justify-content-end">
        <span className="material-symbols-outlined close-icon pt-2 pe-2">close</span>
      </div>
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
