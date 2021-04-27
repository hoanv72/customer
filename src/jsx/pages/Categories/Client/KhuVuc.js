import React from "react";
import DMSTable from "../../../components/table/DMSTable";

const columns = [
  { name: "code", label: "Mã" },
  { name: "name", label: "Tên" },
];
const rows = [
  { code: "1", name: "test 1" },
  { code: "2", name: "test 2" },
  { code: "3", name: "test 3" },
  { code: "4", name: "test 4" },
];

export default function KhuVuc({ data, handleDeleteChannel }) {
  return (
    <DMSTable
      columns={columns}
      rows={data}
      actions={["delete", "edit"]}
      handleDeleteChannel={handleDeleteChannel}
    />
  );
}
