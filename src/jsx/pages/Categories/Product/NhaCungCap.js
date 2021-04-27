import React from "react";
import BasicDatatable from "../../../components/table/BasicDatatable";
import DMSTable from "../../../components/table/DMSTable";

const columns = [
  { name: "code", label: "Mã" },
  { name: "name", label: "Tên" },
  {
    name: "status",
    label: "Trạng thái",
  },
];

export default function NhaCungCap({ data, handleDeleteChannel }) {
  return (
    <DMSTable
      columns={columns}
      rows={data}
      actions={["delete", "edit"]}
      handleDeleteChannel={handleDeleteChannel}
    />
  );
}
