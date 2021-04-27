import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { logout } from '../../../../redux/authSlice';
import { deleteList } from '../_redux/customerSlice';

export default function CustomerDeleteDialog({ id, dmsPage, show, onHide }) {
  const dispatch = useDispatch();
  const { organizationId } = useSelector((state) => state.auth);

  const { params } = useRouteMatch();
  const { contactId } = params;

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteItem = () => {
    dispatch(
      deleteList({
        id: id,
        contactId: contactId,
        oraganizeId: organizationId,
      })
    ).then((deleteResult) => {
      if (deleteResult.payload.code === -2) {
        dispatch(logout());
      }
      if (deleteResult.payload.code === 0 || deleteResult.payload.code === 1) {
        onHide();
      }
    });
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby='example-modal-sizes-title-lg'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-modal-sizes-title-lg'>Xoá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Bạn có chắc muốn xoá liên hệ này?</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type='button'
            onClick={onHide}
            className='btn btn-light btn-elevate mr-3'
          >
            Huỷ
          </button>

          <button
            type='button'
            // disabled={isLoading}
            onClick={deleteItem}
            className='btn btn-primary btn-elevate'
          >
            Xoá
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
