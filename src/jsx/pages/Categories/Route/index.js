import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Button, Card, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { toastr } from "react-redux-toastr";
import { useSelector } from "react-redux";
import { routeService } from "../../../../services/route/route.service";
import "./styles.css";
const Route = () => {
  const [listRoute, setListRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const { organizationId } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (organizationId !== null) {
      setLoading(true);
      const result = await routeService.getListRoute(organizationId);
      setLoading(false);
      const data = result?.data || {};
      if (data.code === -2) {
        return toastr.error("Lấy thông tin tuyến lỗi");
      }
      if (data) {
        setListRoute(data.data);
      }
    }
  };

  const redirectAddRoutePage = () => {
    history.push("route/add");
  };

  if (loading) {
    return <Alert variant={"info"}>Đang tải dữ liệu</Alert>;
  }

  const columns = [
    { name: "code", label: "Mã tuyến" },
    { name: "name", label: "Tên tuyến" },
    { name: "start", label: "Ngày tạo tuyến" },
  ];

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title> Tuyến</Card.Title>
          <Button onClick={redirectAddRoutePage} className="btn btn-primary">
            Thêm tuyến
          </Button>
        </Card.Header>
        <Card.Body>
          <Row className="content">
            <Col span={24}>
              <Table responsive>
                <thead>
                  <tr>
                    {columns &&
                      columns.map((column) => (
                        <th key={column.name}>
                          <strong style={{ textTransform: "uppercase" }}>
                            {column.label}
                          </strong>
                        </th>
                      ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listRoute && listRoute.length > 0 ? (
                    listRoute.map((route) => (
                      <tr>
                        <td>{route.code} </td>
                        <td>{route.code} </td>
                        <td>{route.start} </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={{ background: "#fafafa" }} colSpan="14">
                        <div>No data</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* <div className="table-responsive">
                <table className="table table-clear route-table">
                  <tbody>
                    <tr>
                      <th>Mã tuyến</th>
                      <th>Tên tuyến</th>
                      <th>Ngày tạo tuyến</th>
                    </tr>
                    {listRoute && listRoute.length > 0 ? (
                      listRoute.map((route) => (
                        <tr>
                          <td>{route.code} </td>
                          <td>{route.code} </td>
                          <td>{route.start} </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td style={{ background: "#fafafa" }} colSpan="14">
                          <div>No data</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Route;
