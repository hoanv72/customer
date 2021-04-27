import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { API_ENDPOINT } from "../../../utils/constants";
import DMSTable from "../../components/table/DMSTable";
import { useCustomerUIContext } from "./CustomerUIContext";
import { getList } from "./_redux/customerSlice";

const columns = [
  {
    name: "code",
    label: "Mã",
  },
  {
    name: "name",
    label: "Họ Tên",
  },
  {
    name: "group_id",
    label: "Nhóm",
  },
  {
    name: "type_id",
    label: "Loại",
  },
  {
    name: "contact",
    label: "Người Liên Hệ",
  },
  {
    name: "phone",
    label: "Số điện thoại",
  },
  {
    name: "position",
    label: "Chức Vụ",
  },
];

export default function CustomerCard({ dmsPage }) {
  const { organizationId } = useSelector((state) => state.auth);
  const context = useCustomerUIContext();
  const title = "Khách Hàng";
  const [rowsData, setRowsData] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch();

  useEffect(() => {
    let fetchData = async () => {
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[dmsPage],
          oraganizeId: organizationId,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }

        if (data) {
          setRowsData(data);
        }
      }
    };

    fetchData();

    return () => (fetchData = null);
  }, []);

  const handleDelete = (row) => {
    console.log(row);
  };

  return (
    <>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>{title}</Card.Title>
              <Button
                variant="primary"
                onClick={() => context.newButtonClick()}
              >
                Thêm mới
              </Button>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col lg={12}>
                  <DMSTable
                    columns={columns}
                    rows={rowsData}
                    onDelete={handleDelete}
                    actions={["detail", "edit"]}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
