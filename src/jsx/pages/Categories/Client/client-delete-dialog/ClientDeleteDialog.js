import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINT } from '../../../../../utils/constants';
import { useClientUIContext } from '../ClientUIContext';
import { deleteList } from '../_redux/clientSlice';
// import { useNotification } from './../../../../../../app/WrapNotification';

export function ClientDeleteDialog({ id, show, onHide, dmsPage }) {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  // const notification = useNotification();
  // Customers UI Context
  const clientUIContext = useClientUIContext();

  // Customers Redux state
  const dispatch = useDispatch();
  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.customers.actionsLoading }),
  //   shallowEqual
  // );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  // useEffect(() => {}, [isLoading, dispatch]);

  // const deleteCustomer = () => {
  //   // server request for deleting customer by id
  //   dispatch(actions.deleteCustomer(id, szPage)).then(() => {
  //     // refresh list after deletion
  //     dispatch(actions.fetchCustomers(customersUIProps.queryParams, szPage));
  //     // clear selections list
  //     customersUIProps.setIds([]);
  //     // closing delete modal
  //     onHide();
  //     notification.setSnack({
  //       bShow: true,
  //       nDuration: 3000,
  //       szType: 'success',
  //       szMsg: 'Xóa thành công!',
  //     });
  //   });
  // };

  const deleteItem = () => {
    dispatch(
      deleteList({
        url: API_ENDPOINT[dmsPage],
        id: id,
        oraganizeId: user.oraganize[0].id,
      })
    ).then((deleteResult) => onHide());
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
        <span>Bạn có chắc muốn xoá?</span>
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
