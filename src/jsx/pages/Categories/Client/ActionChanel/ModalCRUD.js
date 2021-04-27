import { Button } from "bootstrap";
import React from "react-bootstrap";
import { Modal } from "react-bootstrap";
function ModalCRUD(props) {
  return (
    <Modal show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>kênh</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCRUD;
