import { Modal, Container, Button } from "react-bootstrap";

export default function ClientDelete({ visible, onCancel, onOk }) {
  return (
    <Modal className="fade" show={visible} size="lg">
      <Modal.Header>
        <Modal.Title>Xóa</Modal.Title>
        <Button className="close" onClick={onCancel}>
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger light" onClick={onCancel}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onOk}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
