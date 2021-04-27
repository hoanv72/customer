import React from 'react';
import DMSTable from '../../../components/table/DMSTable';

const columns = [
  { name: 'code', label: 'Mã' },
  { name: 'name', label: 'Tên' },
  {
    name: 'status',
    label: 'Trạng thái',
  },
];

export default function Target({ data }) {
  return <DMSTable columns={columns} rows={data} />;
}
