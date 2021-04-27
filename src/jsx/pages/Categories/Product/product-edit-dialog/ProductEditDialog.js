import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProductEditDialogHeader } from "./ProductEditDialogHeader";
import ProductEditForm from "./ProductEditForm";
import { useProductUIContext } from "../ProductUIContext";
import {
  createList,
  getList,
  updateList,
} from "../../Client/_redux/clientSlice";
import { API_ENDPOINT } from "../../../../../utils/constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { setNotification } from "../../../../../redux/notificationSlice";

// import * as actions from '../../../_redux/customers/customersActions';
// import { CustomerEditForm } from './CustomerEditForm';
// import { useNotification } from './../../../../../../app/WrapNotification';

export function ProductEditDialog({ id, show, onHide, dmsPage, ...props }) {
  const { organizationId } = useSelector((state) => state.auth);

  const [itemForEdit, setItemForEdit] = useState(null);
  // Product UI Context
  const productUIContext = useProductUIContext();

  // Product Redux state
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
        if (actionResult.code === 0) {
          dispatch(
            getList({
              url: API_ENDPOINT[dmsPage],
              oraganizeId: organizationId,
            })
          ).then(() => {
            dispatch(
              setNotification({
                type: "success",
                message: "Thêm mới thành công!",
                show: true,
                duration: 3000,
              })
            );
            onHide();
          });
        }
      });
    } else {
      // dispatch(
      //   updateList({
      //     url: API_ENDPOINT[dmsPage],
      //     id: id,
      //     values: values,
      //     oraganizeId: organizationId,
      //   })
      // ).then(() => {
      //   dispatch(
      //     setNotification({
      //       type: "success",
      //       message: "Cập nhật thành công!",
      //       show: true,
      //       duration: 3000,
      //     })
      //   );
      //   onHide();
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

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProductEditDialogHeader id={id} />
      <ProductEditForm
        data={itemForEdit}
        dmsPage={dmsPage}
        id={id}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Modal>
  );
}
