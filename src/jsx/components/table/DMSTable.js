import React, { Fragment } from "react";
import { Row, Col, Card, Table, Badge, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

/// image
const DMSTable = ({ columns, rows, ...props }) => {
  const history = useHistory();
  const currentParentPath = history.location.pathname;
  // console.log("currentParentPath", currentParentPath);
  if (rows === null || rows.length === 0) {
    return <Alert variant={"info"}>Đang tải dữ liệu</Alert>;
  }

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    {columns &&
                      columns.map((column) => (
                        <th key={column.name}>
                          <strong
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {column.label}
                          </strong>
                        </th>
                      ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows &&
                    rows.map((row, index) => {
                      return renderRow(
                        columns,
                        row,
                        index,
                        currentParentPath,
                        props
                      );
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

function renderRow(columns, row, index, currentParentPath, props) {
  return (
    <tr key={index + "children"}>
      {columns.map((key) => {
        switch (key.name) {
          case "icon":
            return (
              <td className="sorting_1" key={key.name + index}>
                <i style={{ fontSize: 20 }} className={`${row[key.name]}`}></i>
              </td>
            );
          case "color":
            return (
              <td className="sorting_1" key={key.name + index}>
                <span
                  style={{
                    display: "inline-block",
                    width: 60,
                    height: 40,
                    backgroundColor: row[key.name],
                  }}
                ></span>
              </td>
            );
          case "status":
            if (row[key.name] === true) {
              return (
                <td key={key.name + index}>
                  <Badge variant="success light">Hoạt động</Badge>
                </td>
              );
            }
            if (row[key.name] === false) {
              return (
                <td key={key.name + index}>
                  <Badge variant="danger light">Khóa</Badge>
                </td>
              );
            }
            if (row[key.name] === "hidden") {
              return (
                <td key={key.name + index} style={{ textAlign: "left" }}>
                  <Badge variant="warning light">{row[key.name]}</Badge>
                </td>
              );
            } else {
              return (
                <td key={key.name + index} style={{ textAlign: "left" }}>
                  <Badge variant="light">{row[key.name]}</Badge>
                </td>
              );
            }
          default:
            return (
              <td
                className="sorting_1"
                key={key.name}
                style={{ textAlign: "left" }}
              >
                {row[key.name]}
              </td>
            );
        }
      })}
      <td className="sorting_1" style={{ minWidth: 210 }}>
        {props.actions && props.actions.includes("add") && (
          <Link
            to={`${currentParentPath}/${row.id}/add`}
            className="btn btn-pill btn-primary mr-2 btn-sm"
          >
            <i className="fa fa-plus mr-2"></i>
            Thêm khách hàng
          </Link>
        )}
        {props.actions && props.actions.includes("detail") && (
          <Link
            to={`${currentParentPath}/${row.id}/detail`}
            className="btn btn-pill btn-warning mr-2 btn-sm"
          >
            <i className="fa fa-info mr-2"></i>
            Chi tiết
          </Link>
        )}
        {props.actions && props.actions.includes("edit") && (
          <Link
            to={`${currentParentPath}/${row.id}/edit`}
            className="btn btn-pill btn-primary mr-2 btn-sm"
          >
            <i className="fa fa-pencil mr-2"></i>
            Sửa
          </Link>
        )}
        {props.actions && props.actions.includes("delete") && (
          <div
            onClick={() => props.handleDeleteChannel(row, currentParentPath)}
            className="btn btn-pill btn-danger mr-2 btn-sm"
          >
            <i className="fa fa-trash mr-2"></i>
            Xóa
          </div>
        )}
      </td>
    </tr>
  );
}

export default DMSTable;
