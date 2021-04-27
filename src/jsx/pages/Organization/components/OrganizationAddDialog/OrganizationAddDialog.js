import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useOrganizationUIContext } from '../../OrganizationUIContext';

import { unwrapResult } from '@reduxjs/toolkit';

import {
  addUserToTree,
  getOrganizationListUser,
} from '../../_redux/organizationSlice';

import { setNotification } from '../../../../../redux/notificationSlice';

import OrganizationDialogHeader from './OrganizationDialogHeader';
import OrganizationForm from './OrganizationForm';

export default function OrganizationAddDialog({ show, onHide, listUser, role, selectedTreeId, selectedTreeName, ...props }) {
  const { organizationId } = useSelector((state) => state.auth);

  const [itemForEdit, setItemForEdit] = useState(null);

  // Product Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(role) {
      const actionResult = await dispatch(
        getOrganizationListUser({ role, oraganizeId: organizationId })
      );

      const data = unwrapResult(actionResult);

      if (data) {
        setItemForEdit(data);
      }
    }

    fetchData(role);
  }, [role]);

  // server request for saving customer
  const saveData = (values) => {
    const transformedValue = {
      userId: values.userId,
      treeId: selectedTreeId,
      type: role
    }

    dispatch(
      addUserToTree({
        oraganizeId: organizationId,
        values: transformedValue,
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
      <OrganizationDialogHeader
        role={role}
        selectedTreeName={selectedTreeName}
      />
      <OrganizationForm
        data={itemForEdit}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Modal>
  );
}
