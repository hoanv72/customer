import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

import menus5 from "../../../../images/menus/5.png";
import menus6 from "../../../../images/menus/6.png";
import menus7 from "../../../../images/menus/7.png";
import menus4 from "../../../../images/menus/4.png";
import avatar34 from "../../../../images/avatar/34.png";
import avatar31 from "../../../../images/avatar/31.png";
import avatar32 from "../../../../images/avatar/32.png";
import avatar33 from "../../../../images/avatar/33.png";

const DietMenus = ({ onClick }) => {
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [data, setData] = useState([
    {
      heading: "Papaya Fruit for Vitamin C",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      foodImg: menus5,
      author: { name: "Andrew Sceenshaver", img: avatar34 },
      time: "4-6",
      ingridients: 6,
      review: 568,
    },
    {
      heading: "Vitamin C Vegetables",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      foodImg: menus6,
      author: { name: "Tiffany Lawrenc", img: avatar31 },
      time: "4-6",
      ingridients: 6,
      review: 568,
    },
    {
      heading: "Fresh or Frozen (No Sugar Added) Fruits",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      foodImg: menus7,
      author: { name: "Budy Khan", img: avatar32 },
      time: "4-6",
      ingridients: 6,
      review: 568,
    },
    {
      heading: "Fresh Blueberry & Strawberry Dice",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      foodImg: menus4,
      author: { name: "Louis Montana", img: avatar33 },
      time: "4-6",
      ingridients: 6,
      review: 568,
    },
  ]);
  const hendelClick = () => {
    setRefreshToggle(true);
    setTimeout(() => {
      setData([
        ...data,
        data[Math.floor(Math.random() * Math.floor(data.length - 1))],
      ]);
      setRefreshToggle(false);
    }, 1000);
  };
  return (
    <Fragment>
      <PerfectScrollbar
        className="card-body loadmore-content dz-scroll height750"
        id="DietMenusContent"
      >
        {data.map((d, i) => (
          <div
            className="media border-bottom mb-3 pb-3 d-lg-flex d-block menu-list"
            key={i}
          >
            <Link to="ecom-product-detail">
              <img
                className="rounded mr-3 mb-md-0 mb-3"
                src={d.foodImg}
                alt
                width={120}
              />
            </Link>
            <div className="media-body col-lg-8 pl-0">
              <h6 className="fs-16 font-w600">
                <Link to="ecom-product-detail" className="text-black">
                  {d.heading}
                </Link>
              </h6>
              <p className="fs-14">{d.text}</p>
              <div className="d-flex flex-wrap align-items-center">
                <div className="d-flex mb-sm-2 mb-3 pr-3 mr-auto align-items-center">
                  <img
                    src={d.author.img}
                    alt=""
                    width={30}
                    className="rounded-circle mr-2"
                  />
                  <span className="fs-14 text-black font-w500">
                    {d.author.name}
                  </span>
                </div>
                <ul className="d-flex flex-wrap mb-sm-0 mb-2">
                  <li className="mb-2 mr-4 text-nowrap">
                    <i className="las la-clock scale5 mr-2" />
                    <span className="fs-14 text-black text-nowrap font-w500">
                      {d.time} mins{" "}
                    </span>
                  </li>
                  <li className="mb-2 mr-4 text-nowrap">
                    <i className="las la-prescription-bottle scale5 mr-2" />
                    <span className="text-nowrap fs-14 text-black font-w500">
                      {d.ingridients} Ingridients
                    </span>
                  </li>
                  <li className="text-nowrap mb-2">
                    <i
                      className="fa fa-star-o mr-2 scale5 text-warning"
                      aria-hidden="true"
                    />
                    <span className="text-nowrap fs-14 text-black font-w500">
                      {d.review} Reviews
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              to="/food-menu"
              data-toggle="modal"
              data-target="#aAddDietMenus"
              onClick={() => onClick()}
              className="btn btn-primary light btn-md ml-auto"
            >
              <i className="fa fa-plus scale5 mr-3" />
              Add Menu
            </Link>
          </div>
        ))}
      </PerfectScrollbar>
      <div className="card-footer style-1 text-center border-0 pt-0 pb-4">
        <div
          className="text-primary dz-load-more fa fa-chevron-down custom-box"
          onClick={() => hendelClick()}
        >
          <Link
            className="text-primary dz-load-more fa fa-chevron-down"
            id="DietMenus"
            to="/food-menu"
            rel="ajax/food-menu-list"
          >
            {refreshToggle && <i className="fa fa-refresh"></i>}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default DietMenus;
