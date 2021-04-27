import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TargetEditDialogHeader } from './TargetEditDialogHeader';
import TargetEditForm from './TargetEditForm';
import { useTargetUIContext } from '../TargetUIContext';
import {
  createListTarget,
  getListClient,
  getList,
  updateList,
} from '../../Client/_redux/clientSlice';
import { API_ENDPOINT } from '../../../../../utils/constants';
import { unwrapResult } from '@reduxjs/toolkit';

// import * as actions from '../../../_redux/customers/customersActions';
// import { CustomerEditForm } from './CustomerEditForm';
// import { useNotification } from './../../../../../../app/WrapNotification';

export function TargetEditDialog({ id, show, onHide, dmsPage, ...props }) {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null; // const notification = useNotification();
  const [listUser, setListUser] = useState(null);
  const [itemForEdit, setItemForEdit] = useState(null);
  // Customers UI Context
  const targetUIContext = useTargetUIContext();
  // const customersUIProps = useMemo(() => {
  //   return {
  //     initCustomer: customersUIContext.initCustomer,
  //   };
  // }, [customersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  // const { actionsLoading, customerForEdit } = useSelector(
  //   (state) => ({
  //     actionsLoading: state.customers.actionsLoading,
  //     customerForEdit: state.customers.customerForEdit,
  //   }),
  //   shallowEqual
  // );

  useEffect(() => {
    async function fetchData() {
      if (user !== null) {
        const action = getListClient({
          url: API_ENDPOINT.categoryListUser,
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        setListUser(data);
        // if (data) {
        //   const matchedItem = data.filter((item) => item.id === +id);
        //   setItemForEdit(matchedItem[0]);
        // }
      }
    }

    fetchData();
  }, [id]);

  // server request for saving customer
  const saveData = (values) => {
    console.log(values);
    if (!id) {
      const actionResult = dispatch(
        createListTarget({
          url: API_ENDPOINT.CategoryRoute,
          values: values,
          oraganizeId: user.oraganize[0].id,
        })
      );
      console.log(actionResult);
      // dispatch(
      //   getList({
      //     url: API_ENDPOINT[dmsPage],
      //     oraganizeId: user.oraganize[0].id,
      //   })
      // );
      // onHide();
      //   notification.setSnack({
      //     bShow: true,
      //     nDuration: 4000,
      //     szType: 'success',
      //     szMsg: 'Thêm mới thành công!',
      //   });
      // });
    } else {
      dispatch(
        updateList({
          url: API_ENDPOINT[dmsPage],
          id: id,
          values: values,
          oraganizeId: user.oraganize[0].id,
        })
      ).then(() => {
        onHide();
      });
      // dispatch(actions.updateCustomer(customer, dmsPage)).then(() => {
      //   onHide();
      //   notification.setSnack({
      //     bShow: true,
      //     nDuration: 4000,
      //     szType: 'success',
      //     szMsg: 'Cập nhật thành công!',
      //   });
      // });
    }
  };

  // const [editValues, setEditValue] = useState(undefined);

  // useEffect(()=> {
  //   let formatValue = {...customerForEdit};
  //   if (formatValue.lat && formatValue.long) {
  //     formatValue = {...formatValue, 'latLng': `${formatValue.lat}, ${formatValue.long}`}
  //   }
  //   console.log(formatValue);
  //   setEditValue(formatValue);
  // },[customerForEdit])

  return (
    <Card
      size='lg'
      aria-labelledby='example-modal-sizes-title-lg'
    >
      <TargetEditDialogHeader id={id} />
      <TargetEditForm
        listUser={listUser}
        data={itemForEdit}
        dmsPage={dmsPage}
        id={id}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Card>
  );
}
