import React, { useEffect, Component, useState } from "react";
import { useHistory } from "react-router-dom";
/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    //  this.mm("dispose");
    // console.log(this.mm);
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

// const client = ["chanel", "type", "group", "region"];
const client = ["channel", "type", "group", "region"];
const product = ["unit", "brand", "provider", "industry", "management"];
const oraganize = ["oraganize"];
const categories = ["product", "warehouse", ...client, ...product];
const customer = ["client"];
const bigProduct = ["product-menu"];
// check active in route
const SalesManager = [
  "thong-tin-don-hang",
  "quan-ly-dat-hang",
  "chuong-trinh-khuyen-mai",
];
const CustomerManagement = [
  "thong-tin-khach-hang",
  "nhom-thuong-hieu",
  "hinh-thuc-kinh-doanh",
  "khu-vuc",
  "quan-ly-cong-no",
];
const ProductManagement = [
  "thong-tin-san-pham",
  "nhom-san-pham",
  "nha-cung-cap",
  "nganh-hang",
  "nhan-hieu",
];
const InventoryManagement = [
  "thong-tin-kho",
  "quan-ly-nhap",
  "quan-lys-xuat",
  "quan-ly-ton",
];
const ManagementSupervision = [
  "giam-sat-lo-trinh",
  "giam-sat-chi-tieu",
  "giam-sat-vieng-tham",
];
const ManagementCategory = [
  "nha-cung-cap",
  "tuyen-ban-hang",
  "kenh-ban-hang",
  "hinh-thuc-thanh-toan",
  "don-vi-tinh",
];
const Decentralization = ["1"];
const Systeminstallation = ["2"];
const SideBar = () => {
  const history = useHistory();

  /// Path
  let path = history.location.pathname;
  console.log("path", path);
  path = path.split("/");
  path = path[path.length - 1];

  const [activePath, setActivePath] = useState(path);
  console.log("activePath", activePath);
  console.log("categories", categories);
  useEffect(() => {
    // unsubscribe historyRegister
    let historySub;
    // sidebar open/close
    const btn = document.querySelector(".nav-control");
    const aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);
    // detect route changed
    historySub = history.listen((location, action) => {
      let newPath = location.pathname;
      newPath = newPath.split("/");
      newPath = newPath[newPath.length - 1];

      setActivePath(newPath);
    });

    return () => {
      btn.removeEventListener("click", toggleFunc);
      historySub();
    };
  }, [history]);

  return (
    <div className="deznav">
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          {/* Categories */}
          <li
            className={`${categories.includes(activePath) ? "mm-active" : ""}`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-layer-1"></i>
              <span className="nav-text">Danh Mục</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${client.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link className="has-arrow" to="#" aria-expanded="false">
                  Khách Hàng
                </Link>
                <ul
                  className={`${
                    client.includes(activePath)
                      ? "mm-collapse mm-show"
                      : "mm-collapse"
                  }`}
                >
                  <li className="ml-3">
                    <Link
                      className={`${
                        activePath === "channel" ? "mm-active" : ""
                      }`}
                      to="/category/client/channel"
                    >
                      Kênh
                    </Link>
                  </li>
                  <li className="ml-3">
                    <Link
                      className={`${activePath === "type" ? "mm-active" : ""}`}
                      to="/category/client/type"
                    >
                      Loại Khách Hàng
                    </Link>
                  </li>
                  <li className="ml-3">
                    <Link
                      className={`${activePath === "group" ? "mm-active" : ""}`}
                      to="/category/client/group"
                    >
                      Nhóm Khách Hàng
                    </Link>
                  </li>
                  <li className="ml-3">
                    <Link
                      className={`${
                        activePath === "region" ? "mm-active" : ""
                      }`}
                      to="/category/client/region"
                    >
                      Khu Vực
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link
                  to="/category/warehouse"
                  aria-expanded="false"
                  className={`${activePath === "warehouse" ? "mm-active" : ""}`}
                >
                  Kho Hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/personnel" aria-expanded="false">
                  Tổ chức
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                {/* <Link to="/route" aria-expanded="false">
                  Tuyến
                </Link> */}
              </li>
            </ul>
          </li>
          {/* Customer */}
          {/* <li className={`${customer.includes(activePath) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/client" aria-expanded="false">
              <i className="fas fa-users"></i>
              <span className="nav-text">Khách Hàng</span>
            </Link>
          </li> */}

          {/* <li
            className={`${bigProduct.includes(activePath) ? "mm-active" : ""}`}
          >
            <Link className=" ai-icon" to="/product-menu" aria-expanded="false">
              <i className="flaticon-381-smartphone"></i>
              <span className="nav-text">Sản Phẩm</span>
            </Link>
          </li> */}
          {/* _____________fixx and update menu ver 1____________________________ */}
          <li
            className={`${
              SalesManager.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-id-card"></i>
              <span className="nav-text">Quản lý bán hàng</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link to="" aria-expanded="false">
                  Thông tin đơn hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Quản lý đặt hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Chương trình khuyến mãi
                </Link>
              </li>
            </ul>
          </li>
          {/* Quản lý Khách Hàng */}
          <li
            className={`${
              CustomerManagement.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-user"></i>
              <span className="nav-text">Quản lý Khách Hàng</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link to="/client" aria-expanded="false">
                  Thông tin khách hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Nhóm thương hiệu
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Hình thức kinh doanh
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Khu vực/ vùng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Quản lý công nợ
                </Link>
              </li>
            </ul>
          </li>

          {/* Quản lý Khách Hàng */}
          {/* Quản lý sản phẩm */}
          <li
            className={`${
              ProductManagement.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-layer-1"></i>
              <span className="nav-text">Quản lý sản phẩm</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link to="/product-menu" aria-expanded="false">
                  Thông tin Sản phẩm
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Nhóm sản phẩm
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/category/product/provider" aria-expanded="false">
                  Nhà cung cấp
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Ngành hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/category/product/brand" aria-expanded="false">
                  Nhãn hiệu
                </Link>
              </li>
            </ul>
          </li>

          {/* Quản lý sản phẩm */}
          {/*  Quản lý kho */}
          <li
            className={`${
              InventoryManagement.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-transfer"></i>
              <span className="nav-text">Quản lý kho</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link to="" aria-expanded="false">
                  Thông tin kho
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Quản lý nhập
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Quản lý xuất
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Quản lý tồn
                </Link>
              </li>
            </ul>
          </li>

          {/*  Quản lý kho */}
          {/* Quản lý giám sát */}
          <li
            className={`${
              ManagementSupervision.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link
              className="has-arrow ai-icon"
              to="Monitoring"
              aria-expanded="false"
            >
              <i className="flaticon-381-photo-camera"></i>
              <span className="nav-text">Quản lý giám sát</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link to="Monitoring" aria-expanded="false">
                  Giám sát lộ trình
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Giám sát chỉ tiêu
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Giám sát viếng thăm
                </Link>
              </li>
            </ul>
          </li>

          {/* Quản lý giám sát */}
          {/* Danh Mục Quản lý */}
          <li
            className={`${
              ManagementCategory.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-controls-2"></i>
              <span className="nav-text">Danh Mục Quản lý</span>
            </Link>
            <ul
              className={`${
                categories.includes(activePath) ? "mm-active" : ""
              }`}
            >
              <li
                className={`${product.includes(activePath) ? "mm-active" : ""}`}
              >
                <Link to="/category/product/provider" aria-expanded="false">
                  Nhà cung cấp
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/route" aria-expanded="false">
                  Tuyến bán hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Kênh bán hàng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Hình thức thanh toán
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/category/product/unit" aria-expanded="false">
                  Đơn vị tính
                </Link>
              </li>
            </ul>
          </li>

          {/* Danh Mục Quản lý */}
          {/* Phân quyền */}
          <li
            className={`${
              Decentralization.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="ai-icon" to="" aria-expanded="false">
              <i className="fas fa-users"></i>
              <span className="nav-text">Phân quyền</span>
            </Link>
          </li>

          {/* Phân quyền */}
          {/* Cài đặt hệ thống */}
          <li
            className={`${
              Systeminstallation.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className=" ai-icon" to="" aria-expanded="false">
              <i className="flaticon-381-settings-1"></i>
              <span className="nav-text">Cài đặt hệ thống</span>
            </Link>
          </li>
          {/* Cài đặt hệ thống */}

          {/* _____________fixx and update menu ver 1____________________________ */}
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
