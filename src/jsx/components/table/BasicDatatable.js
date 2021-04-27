import React, { useState, useRef, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';

import tableData from './tableData.js';
import { Link } from 'react-router-dom';

const BasicDatatable = ({ title, columns, rows }) => {
  const [data, setData] = useState(
    document.querySelectorAll('#job_data tbody tr')
  );
  const sort = 5;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove('d-none');
      } else {
        data[i].classList.add('d-none');
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll('#job_data tbody tr'));
    chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  const chackbox = document.querySelectorAll('.sorting_1 input');
  const motherChackBox = document.querySelector('.sorting_asc input');
  // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === 'all') {
        if (motherChackBox.checked === true) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (element.checked == true) {
          motherChackBox.checked = true;
        } else {
          motherChackBox.checked = false;
        }
      }
    }
  };

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title'>{title}</h4>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <div id='job_data' className='dataTables_wrapper '>
              <table
                className='display w-100 dataTable '
                id='example5'
                role='grid'
                aria-describedby='example5_info'
              >
                <thead>
                  <tr role='row'>
                    {columns.map((column) => (
                      <th
                        key={column.name}
                        className='sorting_asc'
                        style={{
                          width: column.width ? `${column.width}px` : null,
                        }}
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => {
                    if (index % 2 !== 0) {
                      return (
                        <tr className='odd' role='row'>
                          {renderRowData(row)}
                        </tr>
                      );
                    } else {
                      return (
                        <tr className='even' role='row'>
                          {renderRowData(row)}
                        </tr>
                      );
                    }
                  })}
                </tbody>
                {/* <tfoot>
                  <tr>
                    <th rowSpan="1" colSpan="1">
                      Name
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Position
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Office
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Age
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Start date
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Salary
                    </th>
                  </tr>
                </tfoot> */}
              </table>
              <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
                <div className='dataTables_info'>
                  Showing {activePag.current * sort + 1} to{' '}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{' '}
                  of {data.length} entries
                </div>
                <div
                  className='dataTables_paginate paging_simple_numbers'
                  id='example5_paginate'
                >
                  <Link
                    className='paginate_button previous disabled'
                    to='/table-datatable-basic'
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    Previous
                  </Link>
                  <span>
                    {paggination.map((number, i) => (
                      <Link
                        key={i}
                        to='/table-datatable-basic'
                        className={`paginate_button  ${
                          activePag.current === i ? 'current' : ''
                        } `}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))}
                  </span>
                  <Link
                    className='paginate_button next'
                    to='/table-datatable-basic'
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderRowData(row) {
  return Object.keys(row).map((key) => {
    switch (key) {
      case 'icon':
        return (
          <td className='sorting_1' key={key}>
            <i style={{ fontSize: 20 }} class={`${row[key]}`}></i>
          </td>
        );
      case 'color':
        return (
          <td className='sorting_1' key={key}>
            <span
              style={{
                display: 'inline-block',
                width: 60,
                height: 40,
                backgroundColor: row[key],
              }}
            ></span>
          </td>
        );

      default:
        return (
          <td className='sorting_1' key={key}>
            {row[key]}
          </td>
        );
    }
  });
}

export default BasicDatatable;
