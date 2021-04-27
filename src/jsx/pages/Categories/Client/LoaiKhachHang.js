import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import DMSTable from "../../../components/table/DMSTable";

const columns = [
  { name: "code", label: "Mã" },
  { name: "name", label: "Tên" },
  { name: "icon", label: "Icon" },
  { name: "color", label: "Màu sắc" },
];
const rows = [
  {
    code: "1",
    name: "test 1",
    icon: "fab fa-adn",
    color: "#ffab73",
  },
  {
    code: "2",
    name: "test 2",
    icon: "fas fa-air-freshener",
    color: "#ffd384",
  },
  {
    code: "3",
    name: "test 3",
    icon: "fas fa-anchor",
    color: "#fff9b0",
  },
  {
    code: "4",
    name: "test 4",
    icon: "far fa-arrow-alt-circle-up",
    color: "#ffaec0",
  },
  {
    code: "5",
    name: "test 5",
    icon: "fas fa-ankh",
    color: "#9ede73",
  },
];

export default function LoaiKhachHang({ data, handleDeleteChannel }) {
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [submitForm, setSubmitForm] = useState(null);
  const [editItem, setEditItem] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (location.pathname.includes("create")) {
      setIsOpenModal(true);
    }
    if (location.pathname.includes("edit")) {
      // fetch edit item
      // const id = location.pathname.split('/')[2];
      // console.log(id);
      // setEditItem(rows[id]);
      // open Modal
      setIsOpenModal(true);
    }

    return () => {
      setIsOpenModal(false);
      setEditItem(null);
    };
  }, [location]);

  const bindSubmitForm = (submitForm) => {
    setSubmitForm(submitForm);
  };

  return (
    <>
      <DMSTable
        columns={columns}
        rows={data}
        actions={["delete", "edit"]}
        handleDeleteChannel={handleDeleteChannel}
      />
    </>
  );
}
