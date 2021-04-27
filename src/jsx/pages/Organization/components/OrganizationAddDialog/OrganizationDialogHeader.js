import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import { EMPLOYEE, ACCOUNTANT, MANAGER } from '../../../../../utils/constants/role';

export default function OrganizationNewDialogHeader({ role, selectedTreeName }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    let _title;

    switch (role) {
      case EMPLOYEE:
        _title = "Thêm nhân viên vào";
        break;
      case ACCOUNTANT:
        _title = "Thêm kế toán vào";
        break;
      case MANAGER:
        _title = "Thêm quản lý vào";
        break;
      default:
        _title = "Thêm nhân viên vào";
    }

    _title = `${_title} ${selectedTreeName}`;

    setTitle(_title);
  }, [role]);

  return (
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
    </Modal.Header>
  );
}
