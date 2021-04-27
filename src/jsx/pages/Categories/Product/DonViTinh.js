import React from "react";
import DMSTable from "../../../components/table/DMSTable";

const columns = [
  { name: "code", label: "Mã" },
  { name: "name", label: "Tên" },
  {
    name: "status",
    label: "Trạng thái",
  },
];

export default function DonViTinh({ data, handleDeleteChannel }) {
  return (
    <DMSTable
      columns={columns}
      rows={data}
      actions={["delete", "edit"]}
      handleDeleteChannel={handleDeleteChannel}
    />
  );
}
