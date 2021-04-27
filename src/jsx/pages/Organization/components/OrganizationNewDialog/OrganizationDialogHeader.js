import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export default function OrganizationNewDialogHeader({ id }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    let _title = id ? "Cập nhật" : "Tạo mới";

    setTitle(_title);
  }, [id]);

  return (
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
    </Modal.Header>
  );
}
