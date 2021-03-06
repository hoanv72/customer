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
              <span className="nav-text">Danh M???c</span>
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
                  Kh??ch H??ng
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
                      K??nh
                    </Link>
                  </li>
                  <li className="ml-3">
                    <Link
                      className={`${activePath === "type" ? "mm-active" : ""}`}
                      to="/category/client/type"
                    >
                      Lo???i Kh??ch H??ng
                    </Link>
                  </li>
                  <li className="ml-3">
                    <Link
                      className={`${activePath === "group" ? "mm-active" : ""}`}
                      to="/category/client/group"
                    >
                      Nh??m Kh??ch H??ng
                    </Link>
                  </li>
                  <li className="ml-3">
                    <Link
                      className={`${
                        activePath === "region" ? "mm-active" : ""
                      }`}
                      to="/category/client/region"
                    >
                      Khu V???c
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
                  Kho H??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/personnel" aria-expanded="false">
                  T??? ch???c
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                {/* <Link to="/route" aria-expanded="false">
                  Tuy???n
                </Link> */}
              </li>
            </ul>
          </li>
          {/* Customer */}
          {/* <li className={`${customer.includes(activePath) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/client" aria-expanded="false">
              <i className="fas fa-users"></i>
              <span className="nav-text">Kh??ch H??ng</span>
            </Link>
          </li> */}

          {/* <li
            className={`${bigProduct.includes(activePath) ? "mm-active" : ""}`}
          >
            <Link className=" ai-icon" to="/product-menu" aria-expanded="false">
              <i className="flaticon-381-smartphone"></i>
              <span className="nav-text">S???n Ph???m</span>
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
              <span className="nav-text">Qu???n l?? b??n h??ng</span>
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
                  Th??ng tin ????n h??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Qu???n l?? ?????t h??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Ch????ng tr??nh khuy???n m??i
                </Link>
              </li>
            </ul>
          </li>
          {/* Qu???n l?? Kh??ch H??ng */}
          <li
            className={`${
              CustomerManagement.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-user"></i>
              <span className="nav-text">Qu???n l?? Kh??ch H??ng</span>
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
                  Th??ng tin kh??ch h??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Nh??m th????ng hi???u
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  H??nh th???c kinh doanh
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Khu v???c/ v??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Qu???n l?? c??ng n???
                </Link>
              </li>
            </ul>
          </li>

          {/* Qu???n l?? Kh??ch H??ng */}
          {/* Qu???n l?? s???n ph???m */}
          <li
            className={`${
              ProductManagement.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-layer-1"></i>
              <span className="nav-text">Qu???n l?? s???n ph???m</span>
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
                  Th??ng tin S???n ph???m
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Nh??m s???n ph???m
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/category/product/provider" aria-expanded="false">
                  Nh?? cung c???p
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Ng??nh h??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/category/product/brand" aria-expanded="false">
                  Nh??n hi???u
                </Link>
              </li>
            </ul>
          </li>

          {/* Qu???n l?? s???n ph???m */}
          {/*  Qu???n l?? kho */}
          <li
            className={`${
              InventoryManagement.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-transfer"></i>
              <span className="nav-text">Qu???n l?? kho</span>
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
                  Th??ng tin kho
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Qu???n l?? nh???p
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Qu???n l?? xu???t
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Qu???n l?? t???n
                </Link>
              </li>
            </ul>
          </li>

          {/*  Qu???n l?? kho */}
          {/* Qu???n l?? gi??m s??t */}
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
              <span className="nav-text">Qu???n l?? gi??m s??t</span>
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
                  Gi??m s??t l??? tr??nh
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Gi??m s??t ch??? ti??u
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  Gi??m s??t vi???ng th??m
                </Link>
              </li>
            </ul>
          </li>

          {/* Qu???n l?? gi??m s??t */}
          {/* Danh M???c Qu???n l?? */}
          <li
            className={`${
              ManagementCategory.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-controls-2"></i>
              <span className="nav-text">Danh M???c Qu???n l??</span>
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
                  Nh?? cung c???p
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/route" aria-expanded="false">
                  Tuy???n b??n h??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  K??nh b??n h??ng
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="" aria-expanded="false">
                  H??nh th???c thanh to??n
                </Link>
              </li>
              <li
                className={`${
                  oraganize.includes(activePath) ? "mm-active" : ""
                }`}
              >
                <Link to="/category/product/unit" aria-expanded="false">
                  ????n v??? t??nh
                </Link>
              </li>
            </ul>
          </li>

          {/* Danh M???c Qu???n l?? */}
          {/* Ph??n quy???n */}
          <li
            className={`${
              Decentralization.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className="ai-icon" to="" aria-expanded="false">
              <i className="fas fa-users"></i>
              <span className="nav-text">Ph??n quy???n</span>
            </Link>
          </li>

          {/* Ph??n quy???n */}
          {/* C??i ?????t h??? th???ng */}
          <li
            className={`${
              Systeminstallation.includes(activePath) ? "mm-active" : ""
            }`}
          >
            <Link className=" ai-icon" to="" aria-expanded="false">
              <i className="flaticon-381-settings-1"></i>
              <span className="nav-text">C??i ?????t h??? th???ng</span>
            </Link>
          </li>
          {/* C??i ?????t h??? th???ng */}

          {/* _____________fixx and update menu ver 1____________________________ */}
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
