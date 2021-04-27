import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

// images
import menu1 from "../../../../images/menus/1.png";
import menu2 from "../../../../images/menus/2.png";
import menu3 from "../../../../images/menus/3.png";
import menu4 from "../../../../images/menus/4.png";

const FeaturedDietMenu = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [data, setData] = useState([
    {
      name: "Kevin Ignis",
      image: menu1,
      time: "4-6",
      review: 176,
      heading: "Chinese Orange Fruit With Avocado Salad",
    },
    {
      name: "Olivia Johanson",
      image: menu2,
      time: "4-6",
      review: 176,
      heading: "Fresh or Frozen (No Sugar Added) Fruits",
    },
    {
      name: "Stefanny Raharjo",
      image: menu3,
      time: "4-6",
      review: 176,
      heading: "Fresh or Frozen (No Sugar Added) Fruits",
    },
    {
      name: "Peter Parkur",
      image: menu4,
      time: "4-6",
      review: 176,
      heading: "Original Boiled Egg with Himalaya Salt",
    },
  ]);
  const onClick = () => {
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
        className="card-body loadmore-content height750 dz-scroll pt-0"
        id="FeaturedMenusContent"
      >
        {data.map((d, i) => (
          <Fragment key={i}>
            <div className="media mb-4">
              <img src={d.image} width={85} alt="" className="rounded mr-3" />
              <div className="media-body">
                <h5>
                  <Link to="food-menu" className="text-black fs-16">
                    {d.heading}
                  </Link>
                </h5>
                <span className="fs-14 text-primary font-w500">
                  Kevin Ignis
                </span>
              </div>
            </div>
            <ul className="d-flex flex-wrap pb-2 border-bottom mb-3 justify-content-between">
              <li className="mr-3 mb-2">
                <i className="las la-clock scale5 mr-3" />
                <span className="fs-14 text-black">{d.time} mins </span>
              </li>
              <li className="mb-2">
                <i
                  className="fa fa-star-o mr-3 scale5 text-warning"
                  aria-hidden="true"
                />
                <span className="fs-14 text-black font-w500">
                  {d.review} Reviews
                </span>
              </li>
            </ul>
          </Fragment>
        ))}
      </PerfectScrollbar>
      <div className="card-footer style-1 text-center border-0 pt-0 pb-4">
        <div
          className="text-primary dz-load-more fa fa-chevron-down custom-box"
          onClick={() => onClick()}
        >
          <Link
            className="text-primary dz-load-more fa fa-chevron-down"
            id="FeaturedMenus"
            to="/"
            rel="ajax/featured-menu-list"
            style={{ bottom: "0" }}
          >
            {" "}
            {refreshToggle && <i className="fa fa-refresh"></i>}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default FeaturedDietMenu;
