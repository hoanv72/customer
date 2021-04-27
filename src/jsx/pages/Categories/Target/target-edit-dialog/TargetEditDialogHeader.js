import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

export function TargetEditDialogHeader({ id }) {
  // Customers Redux state
  // const { customerForEdit, actionsLoading } = useSelector(
  //   (state) => ({
  //     customerForEdit: state.customers.customerForEdit,
  //     actionsLoading: state.customers.actionsLoading,
  //   }),
  //   shallowEqual
  // );

  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : 'Tạo mới';
    // if (customerForEdit && id) {
    //   // _title = `Edit customer '${customerForEdit.firstName} ${customerForEdit.lastName}'`;
    //   _title = `Chỉnh sửa`;
    // }

    setTitle(_title);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id='example-modal-sizes-title-lg'>{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
