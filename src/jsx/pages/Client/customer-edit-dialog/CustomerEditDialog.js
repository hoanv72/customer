import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import * as actions from '../../../_redux/customers/customersActions';
// import { CustomerEditForm } from './CustomerEditForm';
import { useCustomerUIContext } from '../CustomerUIContext';
import CustomerEditForm from './CustomerEditForm';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
// import { useNotification } from './../../../../../../app/WrapNotification';

export default function CustomerEditDialog({
  id,
  show,
  onHide,
  dmsPage,
  ...props
}) {
  // const notification = useNotification();
  // Customers UI Context
  const customersUIContext = useCustomerUIContext();
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
    // server call for getting Customer by id
    // dispatch(actions.fetchCustomer(id, dmsPage));
  }, [id, dmsPage, dispatch]);

  // server request for saving customer
  const saveData = (values) => {
    if (!id) {
      console.log('create new one');
      onHide();
      // server request for creating customer
      // dispatch(actions.createCustomer(customer, dmsPage)).then(() => {
      //   onHide();
      //   notification.setSnack({
      //     bShow: true,
      //     nDuration: 4000,
      //     szType: 'success',
      //     szMsg: 'Thêm mới thành công!',
      //   });
      // });
    } else {
      console.log('update');
      // server request for updating customer
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
    <Modal
      size='lg'
      show={show}
      onHide={onHide}
      aria-labelledby='example-modal-sizes-title-lg'
    >
      <CustomerEditDialogHeader id={id} />
      <CustomerEditForm
        data={null}
        dmsPage={dmsPage}
        id={null}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Modal>
  );
}
