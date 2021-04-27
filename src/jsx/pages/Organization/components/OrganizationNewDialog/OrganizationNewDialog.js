import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useOrganizationUIContext } from '../../OrganizationUIContext';
import {
  createUser,
} from '../../_redux/organizationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { setNotification } from '../../../../../redux/notificationSlice';

import OrganizationDialogHeader from './OrganizationDialogHeader';
import OrganizationForm from './OrganizationForm';

export default function OrganizationNewDialog({ id, show, onHide, dmsPage, ...props }) {
  const { organizationId } = useSelector((state) => state.auth);

  const [itemForEdit, setItemForEdit] = useState(null);
  // Product UI Context
  const organizationUIContext = useOrganizationUIContext();

  // Product Redux state
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function fetchData() {
  //     if (organizationId !== null) {
  //       const action = getList({
  //         url: API_ENDPOINT[dmsPage],
  //         oraganizeId: organizationId,
  //       });
  //       const actionResult = await dispatch(action);
  //       const data = unwrapResult(actionResult);
  //       if (data.code === 0) {
  //         const matchedItem = data.data.filter((item) => item.id === +id);
  //         setItemForEdit(matchedItem[0]);
  //       }
  //     }
  //   }
  //   if (id) {
  //     fetchData();
  //   }
  // }, [id]);

  // server request for saving customer
  const saveData = (values) => {
      dispatch(
        createUser({
          oraganizeId: organizationId,
          values,
        })
      ).then((response) => {
        console.log(response);
        if (response.payload.code === 0) {
          dispatch(setNotification({
            type: 'success',
            message: 'Thêm mới thành công!',
            show: true,
            duration: 3000,
          }));
          onHide();
        } else {
          dispatch(
            setNotification({
              type: 'error',
              message: response.payload && response.payload.message,
              show: true,
              duration: 3000,
            })
          )
        }
      });
  };

  return (
    <Modal
      size='lg'
      show={show}
      onHide={onHide}
      backdrop='static'
      aria-labelledby='example-modal-sizes-title-lg'
    >
      <OrganizationDialogHeader id={id} />
      <OrganizationForm
        data={itemForEdit}
        dmsPage={dmsPage}
        id={id}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Modal>
  );
}
