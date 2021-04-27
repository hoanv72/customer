import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API_ENDPOINT } from "../../../../utils/constants";

import { useClientUIContext } from "./ClientUIContext";
import { Modal } from "react-bootstrap";
import DMSTreeMenu from "../../../components/TreeMenu/DMS/DMSTreeMenu";
import Kenh from "./Kenh";
import KhuVuc from "./KhuVuc";
import LoaiKhachHang from "./LoaiKhachHang";
import NhomKhachHang from "./NhomKhachHang";
import { getList } from "./_redux/clientSlice";
import { logout } from "../../../../redux/authSlice";

const renderTable = (dmsPage, data, handleDeleteChannel) => {
  switch (dmsPage) {
    // case "categoryClientChanel":
    case "categoryClientChannel":
      return <Kenh data={data} handleDeleteChannel={handleDeleteChannel} />;
    case "categoryClientType":
      return (
        <LoaiKhachHang data={data} handleDeleteChannel={handleDeleteChannel} />
      );
    case "categoryClientGroup":
      return (
        <NhomKhachHang data={data} handleDeleteChannel={handleDeleteChannel} />
      );
    case "categoryClientRegion":
      return <KhuVuc data={data} handleDeleteChannel={handleDeleteChannel} />;

    default:
      return null;
  }
};

export default function ClientCard({ dmsPage }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { organizationId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  // dispatch(categoriesClientActions.categoriesClientActions.getClient(dmsPage));
  const showPopUp = () => {};
  const context = useClientUIContext();
  const title =
    // dmsPage === "categoryClientChanel"
    dmsPage === "categoryClientChannel"
      ? "Kênh"
      : dmsPage === "categoryClientType"
      ? "Loại Khách Hàng"
      : dmsPage === "categoryClientGroup"
      ? "Nhóm Khách Hàng"
      : dmsPage === "categoryClientRegion"
      ? "Khu Vực"
      : null;

  useEffect(() => {
    let fetchData = async () => {
      if (organizationId !== null) {
        const action = getList({
          url: API_ENDPOINT[dmsPage],
          oraganizeId: organizationId,
          dmsPage,
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
  }, []);
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
                // onClick={handleShow}
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
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>kênh</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
