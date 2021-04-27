import React, { Fragment } from 'react';
import { Row, Col, Card, Table, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/// image
const CustomerContactTable = ({ columns, rows, clientId, ...props }) => {
  if (rows && rows.length === 0) {
    return <Alert variant={'info'}>Đang tải dữ liệu</Alert>;
  }

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Danh sách liên hệ</Card.Title>
              { props.readOnly ? null : <Link
                variant='primary'
                to={`/client/${clientId}/contact/add`}
                className='btn btn-pill btn-primary mr-2 btn-sm'
              >
                <i className='fa fa-plus mr-2'></i>
                Thêm
              </Link> }
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    {columns &&
                      columns.map((column) => (
                        <th key={column.name}>
                          <strong style={{ textTransform: 'uppercase' }}>
                            {column.label}
                          </strong>
                        </th>
                      ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows &&
                    clientId &&
                    rows.map((row, index) => {
                      return renderRow(columns, row, index, clientId, props);
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

function renderRow(columns, row, index, clientId, props) {
  return (
    <tr key={index + 'children'}>
      {columns.map((key) => {
        switch (key.name) {
          case 'icon':
            return (
              <td className='sorting_1' key={key.name + index}>
                <i style={{ fontSize: 20 }} className={`${row[key.name]}`}></i>
              </td>
            );
          case 'color':
            return (
              <td className='sorting_1' key={key.name + index}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 60,
                    height: 40,
                    backgroundColor: row[key.name],
                  }}
                ></span>
              </td>
            );
          case 'status':
            if (row[key.name] === true) {
              return (
                <td key={key.name + index}>
                  <Badge variant='success light'>Hoạt động</Badge>
                </td>
              );
            }
            if (row[key.name] === false) {
              return (
                <td key={key.name + index}>
                  <Badge variant='danger light'>Khóa</Badge>
                </td>
              );
            }
            if (row[key.name] === 'hidden') {
              return (
                <td key={key.name + index}>
                  <Badge variant='warning light'>{row[key.name]}</Badge>
                </td>
              );
            } else {
              return (
                <td key={key.name + index}>
                  <Badge variant='light'>{row[key.name]}</Badge>
                </td>
              );
            }
          default:
            return (
              <td className='sorting_1' key={key.name}>
                {row[key.name]}
              </td>
            );
        }
      })}
      { props.readOnly ? null : (
        <td className='sorting_1' style={{ minWidth: 210 }}>
        <Link
          to={`/client/${clientId}/contact/${row.id}/edit`}
          className='btn btn-pill btn-primary mr-2 btn-sm'
        >
          <i className='fa fa-pencil mr-2'></i>
          Sửa
        </Link>
        <Link
          to={`/client/${clientId}/contact/${row.id}/delete`}
          className='btn btn-pill btn-danger mr-2 btn-sm'
        >
          <i className='fa fa-trash mr-2'></i>
          Xóa
        </Link>
      </td>
      )}
    </tr>
  );
}

export default CustomerContactTable;
