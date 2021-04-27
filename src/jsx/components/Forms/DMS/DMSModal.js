import React from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function DMSModal({
  title,
  isOpen,
  handleClose,
  handleSubmitForm,
  children,
  ...props
}) {
  const history = useHistory();

  const onClose = () => {
    handleClose(false);
    history.push('/loai-khach-hang'); // redirect to 1 upper level url
  };

  const onSubmit = () => {
    onClose();
    // handleSubmitForm();
  };

  return (
    <Modal className='fade' show={isOpen} size='lg'>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Button variant='' className='close' onClick={onClose}>
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Container>{children}</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger light' onClick={onClose}>
          Hủy
        </Button>
        <Button variant='primary' onClick={onSubmit}>
          {props.itemForEdit !== null ? 'Cập nhật' : 'Thêm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
