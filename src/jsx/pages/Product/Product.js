import React, { useState, useEffect } from "react";
import { Table, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import { API_ENDPOINT } from "../../../utils/constants";
import { getList } from "../Categories/Client/_redux/clientSlice";
import PriceForm from "./PriceForm";
import ProductForm from "./ProductForm";
import ProductModal from "./ProductModal";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { logout } from "../../../redux/authSlice";
import * as action from "./_redux/productAction";
const Product = (props) => {
  const [isShowProductModal, setIsShowProductModal] = useState();
  const [isShowPriceModal, setIsShowPriceModal] = useState();
  const [modalTitle, setModalTitle] = useState("add new");
  const [error, setError] = useState("");
  const [arrProduct, setArrProduct] = useState();
  const [brand, setBrand] = useState([]);
  const [provider, setProvider] = useState([]);
  const [insdustry, setIndustry] = useState([]);
  const [client, setClient] = useState([]);
  const [unit, setUnit] = useState([]);
  const [detail, setDetail] = useState(null);
  const [price, setPrice] = useState([]);
  const [priceEdit, setPriceEdit] = useState(null);
  const dispatch = useDispatch();
  const urlBrand = "categoryProductBrand";
  const urlProvider = "categoryProductProvider";
  const urlIndustry = "categoryProductIndustry";
  const urlUnit = "categoryProductUnit";
  const urlTypeCustomer = "categoryClientGroup";
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  useEffect(() => {
    let fetchDataBrand = async () => {
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[urlBrand],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }
        if (data) {
          setBrand(data.data);
          // setRowsData(data.data);
        }
      }
    };
    let fetchDataClientType = async () => {
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[urlTypeCustomer],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }
        if (data) {
          setClient(data.data);
          // setRowsData(data.data);
        }
      }
    };
    let fetchDataProvider = async () => {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[urlProvider],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }
        if (data) {
          setProvider(data.data);
        }
      }
    };
    let fetchDataInsdustry = async () => {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[urlIndustry],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }
        if (data) {
          setIndustry(data.data);
          // setRowsData(data.data);
        }
      }
    };
    let fetchDataUnit = async () => {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[urlUnit],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data.code === -2) {
          dispatch(logout());
          return;
        }
        if (data) {
          setUnit(data.data);
          // setRowsData(data.data);
        }
      }
    };
    const oraganizeId = user.oraganize[0].id;
    dispatch(action.fetchsProduct(oraganizeId)).then((data) => {
      setArrProduct(data.data);
    });
    fetchDataInsdustry();
    fetchDataProvider();
    fetchDataBrand();
    fetchDataUnit();
    fetchDataClientType();
  }, [dispatch]);
  const onShowProductModal = () => {
    setIsShowProductModal(true);
  };
  const onCloseModal = (value) => {
    setIsShowProductModal(value);
  };
  const onGetInputProduct = (obj) => {
    const oraganizeId = user.oraganize[0].id;
    dispatch(action.createdProduct(obj, oraganizeId)).then((data) => {
      console.log(data);
      if (data.code !== 0) {
        console.log(data.message);
        return false;
      } else {
        dispatch(action.fetchsProduct(oraganizeId));
        setIsShowProductModal(false);
      }
    });
  };

  const onGetInputProductPrice = (obj) => {
    const oraganizeId = user.oraganize[0].id;
    if (priceEdit && priceEdit.product_id) {
      dispatch(
        action.updatePrice(obj, oraganizeId, detail.id, priceEdit.product_id)
      ).then((res) => {
        dispatch(action.fetchPriceProduct(oraganizeId, detail.id)).then(
          (data) => {
            setPrice(data.data);
          }
        );
        setIsShowPriceModal(false);
      });
    } else {
      dispatch(action.createdPrice(obj, oraganizeId, detail.id)).then((res) => {
        dispatch(action.fetchPriceProduct(oraganizeId, detail.id)).then(
          (data) => {
            setPrice(data.data);
          }
        );
        setIsShowPriceModal(false);
      });
    }
  };

  const onShowPriceModal = () => {
    setPriceEdit(null);
    setIsShowPriceModal(true);
  };

  const onClosePriceModal = (value) => {
    setIsShowPriceModal(value);
  };
  const showModalEdit = (data) => {
    setIsShowPriceModal(true);
    setPriceEdit(data);
  };
  //render
  const getDetailProduct = (data) => {
    const oraganizeId = user.oraganize[0].id;
    setDetail(data);
    dispatch(action.fetchPriceProduct(oraganizeId, data.id)).then((data) => {
      setPrice(data.data);
    });
    setKey("detail");
  };
  const renderTableBody = () => {
    return arrProduct?.map((it) => {
      return (
        <>
          <tr key={it.id}>
            <td>{it.code}</td>
            <td>{it.name}</td>
            <td>{it.brand}</td>
            <td>{it.industry_id}</td>
            <td>{it.supplier}</td>
            <td>{it.price_odd_unit_id}</td>
            <td>{it.vat}</td>
            <td>
              <div className="d-flex">
                <Button
                  onClick={() => getDetailProduct(it)}
                  className="btn-warning ml-2 d-flex align-items-center "
                >
                  <i
                    class="fa fa-pencil btn-text-font"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                  <div className="ml-1 btn-text-font">Chi tiết</div>
                </Button>
                <Button
                  // onClick={onShowEditModal(index)}
                  className="btn-success ml-2 d-flex align-items-center "
                >
                  <i
                    class="fa fa-pencil btn-text-font"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                  <div className="ml-1 btn-text-font">Sửa</div>
                </Button>

                <Button
                  // onClick={onDelete(index)}
                  className="btn-danger ml-2 d-flex align-items-center "
                >
                  <i
                    class="fa fa-trash btn-text-font"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                  <div className="ml-1 btn-text-font">Xóa</div>
                </Button>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };
  const renderTableBodyDetailPrice = () => {
    return price?.map((it) => {
      return (
        <>
          <tr key={it.id}>
            <td>{it.type_client_id}</td>
            <td>{it && it.TypeClient ? it.TypeClient.name : null}</td>
            <td>{it.vat}</td>
            <td>{it.price_even}</td>
            <td>{it.price_odd}</td>
            <td>{it.discount_even}</td>
            <td>{it.discount_odd}</td>
            <td>{it.vat}</td>
            <td>
              <div className="d-flex">
                <Button
                  onClick={() => showModalEdit(it)}
                  className="btn-success ml-2 d-flex align-items-center "
                >
                  <i
                    class="fa fa-pencil btn-text-font"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                  <div className="ml-1 btn-text-font">Sửa</div>
                </Button>

                <Button
                  // onClick={onDelete(index)}
                  className="btn-danger ml-2 d-flex align-items-center "
                >
                  <i
                    class="fa fa-trash btn-text-font"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                  <div className="ml-1 btn-text-font">Xóa</div>
                </Button>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };
  const renderTableBodyDetail = () => {
    return (
      <>
        {detail && detail.BrandProduct ? (
          <tr key={detail.id}>
            <td>{detail.code}</td>
            <td>{detail.name}</td>
            <td>{detail.BrandProduct.name}</td>
            <td>{detail.industry}</td>
            <td>{detail.provider}</td>
            <td>{detail.BrandProduct.price_even_unit}</td>
            <td>{detail.vat}</td>
          </tr>
        ) : null}
      </>
    );
  };

  const renderProductModalBody = () => {
    return (
      <ProductForm
        unit={unit}
        brand={brand}
        industry={insdustry}
        provider={provider}
        modalTitle={modalTitle}
        itemProduct={onGetInputProduct}
      />
    );
  };
  const renderPriceModalBody = () => {
    return (
      <PriceForm
        priceEdit={priceEdit}
        client={client}
        modalTitle={modalTitle}
        itemProduct={onGetInputProductPrice}
      />
    );
  };
  const [key, setKey] = useState("product");
  const handleTabs = (e) => {
    if (detail === null) {
      return false;
    }
    setKey(e);
  };
  // hooks
  return (
    <>
      <Row>
        <Col lg={12}>
          <Tabs activeKey={key} onSelect={handleTabs}>
            <Tab eventKey="product" title="Sản Phẩm">
              <Card className="mt-4">
                <Card.Header>
                  <Card.Title>Sản Phẩm</Card.Title>
                  <Button variant="primary" onClick={onShowProductModal}>
                    Thêm mới
                  </Button>
                </Card.Header>

                <Card.Body>
                  <Row>
                    <Table>
                      <thead>
                        <tr>
                          <th>Mã Sản Phẩm</th>
                          <th>Tên Sản Phẩm</th>
                          <th>Nhãn Hiệu</th>
                          <th>Ngành Hàng</th>
                          <th>Nhà Cung Cấp</th>
                          <th>Đơn Vị Tính</th>
                          <th>VAT</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableBody()}</tbody>
                    </Table>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="detail" title="Chi tiết">
              <Card className="mt-4">
                <Card.Header>
                  <Card.Title>Chi tiết sản phẩm</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Row>
                    <Table>
                      <thead>
                        <tr>
                          <th>Mã Sản Phẩm</th>
                          <th>Tên Sản Phẩm</th>
                          <th>Nhãn Hiệu</th>
                          <th>Ngành Hàng</th>
                          <th>Nhà Cung Cấp</th>
                          <th>Đơn Vị Tính</th>
                          <th>VAT</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableBodyDetail()}</tbody>
                    </Table>
                  </Row>
                  <Row>
                    <Card>
                      <Card.Header>
                        <Card.Title>Giá khác cho khách hàng</Card.Title>
                        <Button
                          variant="primary ml-auto"
                          onClick={onShowPriceModal}
                        >
                          Thêm mới
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <Table>
                          <thead>
                            <tr>
                              <th>Mã Khách hàng</th>
                              <th>Tên khách hàng</th>
                              <th>VAT</th>
                              <th>Giá chẵn</th>
                              <th>Giá lẻ </th>
                              <th>Chiết Khấu Chẵng</th>
                              <th>Chiết Khấu Lẻ</th>
                              <th>Hành động</th>
                            </tr>
                          </thead>
                          <tbody>{renderTableBodyDetailPrice()}</tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <ProductModal
        size="lg"
        isShowModal={isShowProductModal}
        onClose={onCloseModal}
        modalTitle={modalTitle}
        modalBody={renderProductModalBody()}
      />

      <ProductModal
        size="lg"
        isShowModal={isShowPriceModal}
        onClose={onClosePriceModal}
        modalTitle={modalTitle}
        modalBody={renderPriceModalBody()}
      />
    </>
  );
};
export default Product;
