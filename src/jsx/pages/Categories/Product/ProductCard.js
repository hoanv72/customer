import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useProductUIContext } from "./ProductUIContext";

import DonViTinh from "./DonViTinh";
import NhanHieu from "./NhanHieu";
import NhaCungCap from "./NhaCungCap";
import NganhHang from "./NganhHang";
import { useDispatch } from "react-redux";
import { getList } from "../Client/_redux/clientSlice";
import { API_ENDPOINT } from "../../../../utils/constants";
import { logout } from "../../../../redux/authSlice";

export default function ProductCard({ dmsPage }) {
  const [rowsData, setRowsData] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch();
  const context = useProductUIContext();
  const title =
    dmsPage === "categoryProductUnit"
      ? "Đơn Vị Tính"
      : dmsPage === "categoryProductBrand"
      ? "Nhãn Hiệu"
      : dmsPage === "categoryProductProvider"
      ? "Nhà Cung Cấp"
      : dmsPage === "categoryProductIndustry"
      ? "Ngành Hàng"
      : null;

  const renderTable = (dmsPage, data) => {
    switch (dmsPage) {
      case "categoryProductUnit":
        return (
          <DonViTinh
            dmsPage={dmsPage}
            data={data}
            handleDeleteChannel={handleDeleteChannel}
          />
        );
      case "categoryProductBrand":
        return (
          <NhanHieu
            dmsPage={dmsPage}
            data={data}
            handleDeleteChannel={handleDeleteChannel}
          />
        );
      case "categoryProductProvider":
        return (
          <NhaCungCap
            dmsPage={dmsPage}
            data={data}
            handleDeleteChannel={handleDeleteChannel}
          />
        );
      case "categoryProductIndustry":
        return (
          <NganhHang
            dmsPage={dmsPage}
            data={data}
            handleDeleteChannel={handleDeleteChannel}
          />
        );

      default:
        return null;
    }
  };
  console.log("dmsPage", dmsPage);
  useEffect(() => {
    let fetchData = async () => {
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[dmsPage],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }
        if (data) {
          setRowsData(data.data);
        }
      }
    };

    fetchData();
  }, [dmsPage]);
  const handleDeleteChannel = (row, currentParentPath) => {
    // console.log("token ", userTk.token);
    // console.log("row", row.id); // rowID for delete
    // console.log("context", context);
    console.log("currentParentPath", currentParentPath);
    var userTk = JSON.parse(localStorage.getItem("user"));
    // ------------- delete chanel by id -----------
    var baseURL = "https://api-dms.huongda.net/web-customer";
    var url = `${baseURL}${currentParentPath}/${row.id}`;
    console.log("url", url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "hdo-ip": "127.0.0.2",
        Authorization: `Bearer ${userTk.token}`,
        oraganize: 2,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("done");
        window.location.reload();
      })
      .catch((error) => console.log(error));
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
                {/* Table */}
                <Col lg={12}>
                  {renderTable(dmsPage, rowsData, handleDeleteChannel)}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
