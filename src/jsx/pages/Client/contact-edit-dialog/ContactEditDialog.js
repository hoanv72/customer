import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { logout } from "../../../../redux/authSlice";
import { getClientDetail } from "../_redux/customerSlice";
import { ContactEditDialogHeader } from "./ContactEditDialogHeader";
import ContactEditForm from "./ContactEditForm";

export default function ContactEditDialog({ show, onHide, id, dmsPage }) {
  const { params } = useRouteMatch();
  const { contactId } = params;
  const dispatch = useDispatch();
  const { organizationId } = useSelector((state) => state.auth);

  const [itemForEdit, setItemForEdit] = useState(null);

  const saveData = (values) => {
    console.log(values);
  };

  useEffect(() => {
    async function fetchEditData() {
      const getClientDetailResultAction = await dispatch(
        getClientDetail({ id: contactId, oraganizeId: organizationId })
      );
      const clientDetailData = unwrapResult(getClientDetailResultAction);
      if (clientDetailData.code === -2) {
        dispatch(logout());
      }
      if (clientDetailData.id) {
        const contacts = clientDetailData.contact;
        const matchedContact = contacts.filter(
          (contact) => contact.id === +contactId
        );
        setItemForEdit(matchedContact[0]);
      }
    }

    if (contactId) {
      fetchEditData();
    }
  }, [contactId, organizationId]);

  return (
    <Modal size="xl" show={show} onHide={onHide}>
      <ContactEditDialogHeader id={id} />
      <ContactEditForm
        data={itemForEdit}
        dmsPage={dmsPage}
        id={id}
        saveData={(values) => saveData(values)}
        onHide={onHide}
      />
    </Modal>
  );
}
