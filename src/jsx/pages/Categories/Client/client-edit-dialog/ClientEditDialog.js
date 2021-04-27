import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClientEditDialogHeader } from "./ClientEditDialogHeader";
import { useClientUIContext } from "../ClientUIContext";
import ClientEditForm from "./ClientEditForm";
import { createList, getList, updateList } from "../_redux/clientSlice";
// import { useNotification } from './../../../../../../app/WrapNotification';
import { API_ENDPOINT } from "../../../../../utils/constants";
import { unwrapResult } from "@reduxjs/toolkit";

export function ClientEditDialog({ id, show, onHide, dmsPage, ...props }) {
  const { organizationId } = useSelector((state) => state.auth);
  const [itemForEdit, setItemForEdit] = useState(null);
  // const notification = useNotification();
  // Customers UI Context
  const customersUIContext = useClientUIContext();
  // const customersUIProps = useMemo(() => {
  //   return {
  //     initCustomer: customersUIContext.initCustomer,
  //   };
  // }, [customersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (organizationId !== null) {
        const action = getList({
          url: API_ENDPOINT[dmsPage],
          oraganizeId: organizationId,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === 0) {
          const matchedItem = data.data.filter((item) => item.id === +id);
          setItemForEdit(matchedItem[0]);
        }
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  // server request for saving customer
  const saveData = (values) => {
    if (!id) {
      dispatch(
        createList({
          url: API_ENDPOINT[dmsPage],
          values: values,
          oraganizeId: organizationId,
        })
      ).then((actionResult) => {
        console.log("actionResult.payload.code", actionResult.payload.code);
        if (actionResult.payload.code === 0) {
          dispatch(
            getList({
              url: API_ENDPOINT[dmsPage],
              oraganizeId: organizationId,
            })
          );
          onHide();
        }
      });
      // if (actionResult.code === 0) {
      //   notification.setSnack({
      //     bShow: true,
      //     nDuration: 4000,
      //     szType: 'success',
      //     szMsg: 'Thêm mới thành công!',
      //   });
      // });
    } else {
      // dispatch(
      //   updateList({
      //     url: API_ENDPOINT[dmsPage],
      //     id: id,
      //     values: values,
      //     oraganizeId: organizationId,
      //   })
      // ).then((actionResult) => {
      //   console.log("actionResult", actionResult);
      //   if (actionResult.payload.code === 0) {
      //     dispatch(
      //       getList({
      //         url: API_ENDPOINT[dmsPage],
      //         oraganizeId: organizationId,
      //       })
      //     );
      //     onHide();
      //   }
      // });
      // ______________________________________________________________________
      // dispatch(actions.updateCustomer(customer, dmsPage)).then(() => {
      //   onHide();
      //   notification.setSnack({
      //     bShow: true,
      //     nDuration: 4000,
      //     szType: 'success',
      //     szMsg: 'Cập nhật thành công!',
      //   });
      // });
      // ___________________Update flow demo________________________________

      const urlEdit = `https://api-dms.huongda.net/web-customer/category${API_ENDPOINT[dmsPage]}/${id}`;
      // ______________________________________________________________________
      values.status = true;
      var userTk = JSON.parse(localStorage.getItem("user"));
      // ______________________________________________________________________
      fetch(urlEdit, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userTk.token}`,
          oraganize: 2,
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("done", response);
          onHide();
          // window.location.reload();
        })
        .catch((error) => console.log(error));
      // ___________________Update flow demo________________________________
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
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ClientEditDialogHeader id={id} />
      <ClientEditForm
        data={itemForEdit}
        dmsPage={dmsPage}
        id={id}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Modal>
  );
}
