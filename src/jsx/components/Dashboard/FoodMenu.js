import React, { useState, Fragment } from "react";
import { Modal } from "react-bootstrap";

// Image

import menus9 from "../../../images/menus/9.png";
import menus10 from "../../../images/menus/10.png";
import menus11 from "../../../images/menus/11.png";
import menus12 from "../../../images/menus/12.png";
import { Link } from "react-router-dom";
import DietMenus from "../Gymove/FoodMenu/DietMenus";

const FoodMenu = () => {
  const [modalToggle, setModalToggle] = useState(false);
  return (
    <Fragment>
      <Modal className="modal fade" id="aAddDietMenus" show={modalToggle}>
        <div role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Diet Menus</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setModalToggle(false)}
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setModalToggle(false);
                }}
              >
                <div className="form-group">
                  <label>Running</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Km"
                  />
                </div>
                <div className="form-group">
                  <label>Cycling</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Km"
                  />
                </div>
                <div className="form-group">
                  <label>Yoga</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="hr"
                  />
                </div>
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <div className="row">
        <div className="col-xl-9 col-xxl-8">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-block pb-0 border-0">
                  <div className="d-sm-flex flex-wrap align-items-center d-block mb-md-3 mb-0">
                    <div className="mr-auto pr-3 mb-3">
                      <h4 className="text-black fs-20">Diet Menus</h4>
                      <p className="fs-13 mb-0 text-black">
                        Lorem ipsum dolor sit amet, consectetur
                      </p>
                    </div>
                    <div className="input-group mb-3 diet-search mr-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Menus here"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fa fa-search" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <Link
                      to="/food-menu"
                      className="btn rounded  btn-primary mb-3"
                    >
                      <svg
                        className="mr-2"
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.31615 6H14.4744C14.4744 6.53043 14.6882 7.03914 15.0686 7.41421C15.4491 7.78929 15.9651 8 16.5032 8H18.532C19.07 8 19.5861 7.78929 19.9665 7.41421C20.347 7.03914 20.5607 6.53043 20.5607 6H21.5751C21.8442 6 22.1022 5.89464 22.2924 5.70711C22.4827 5.51957 22.5895 5.26522 22.5895 5C22.5895 4.73478 22.4827 4.48043 22.2924 4.29289C22.1022 4.10536 21.8442 4 21.5751 4H20.5607C20.5607 3.46957 20.347 2.96086 19.9665 2.58579C19.5861 2.21071 19.07 2 18.532 2H16.5032C15.9651 2 15.4491 2.21071 15.0686 2.58579C14.6882 2.96086 14.4744 3.46957 14.4744 4H3.31615C3.04711 4 2.7891 4.10536 2.59887 4.29289C2.40863 4.48043 2.30176 4.73478 2.30176 5C2.30176 5.26522 2.40863 5.51957 2.59887 5.70711C2.7891 5.89464 3.04711 6 3.31615 6ZM16.5032 4H18.532V5V6H16.5032V4ZM21.5751 11H12.4456C12.4456 10.4696 12.2319 9.96086 11.8514 9.58579C11.471 9.21071 10.9549 9 10.4169 9H8.38809C7.85002 9 7.334 9.21071 6.95353 9.58579C6.57306 9.96086 6.35931 10.4696 6.35931 11H3.31615C3.04711 11 2.7891 11.1054 2.59887 11.2929C2.40863 11.4804 2.30176 11.7348 2.30176 12C2.30176 12.2652 2.40863 12.5196 2.59887 12.7071C2.7891 12.8946 3.04711 13 3.31615 13H6.35931C6.35931 13.5304 6.57306 14.0391 6.95353 14.4142C7.334 14.7893 7.85002 15 8.38809 15H10.4169C10.9549 15 11.471 14.7893 11.8514 14.4142C12.2319 14.0391 12.4456 13.5304 12.4456 13H21.5751C21.8442 13 22.1022 12.8946 22.2924 12.7071C22.4827 12.5196 22.5895 12.2652 22.5895 12C22.5895 11.7348 22.4827 11.4804 22.2924 11.2929C22.1022 11.1054 21.8442 11 21.5751 11ZM8.38809 13V11H10.4169V12V13H8.38809ZM21.5751 18H18.532C18.532 17.4696 18.3182 16.9609 17.9378 16.5858C17.5573 16.2107 17.0413 16 16.5032 16H14.4744C13.9364 16 13.4203 16.2107 13.0399 16.5858C12.6594 16.9609 12.4456 17.4696 12.4456 18H3.31615C3.04711 18 2.7891 18.1054 2.59887 18.2929C2.40863 18.4804 2.30176 18.7348 2.30176 19C2.30176 19.2652 2.40863 19.5196 2.59887 19.7071C2.7891 19.8946 3.04711 20 3.31615 20H12.4456C12.4456 20.5304 12.6594 21.0391 13.0399 21.4142C13.4203 21.7893 13.9364 22 14.4744 22H16.5032C17.0413 22 17.5573 21.7893 17.9378 21.4142C18.3182 21.0391 18.532 20.5304 18.532 20H21.5751C21.8442 20 22.1022 19.8946 22.2924 19.7071C22.4827 19.5196 22.5895 19.2652 22.5895 19C22.5895 18.7348 22.4827 18.4804 22.2924 18.2929C22.1022 18.1054 21.8442 18 21.5751 18ZM14.4744 20V18H16.5032V19V20H14.4744Z"
                          fill="#fff"
                        />
                      </svg>
                      Filter
                    </Link>
                  </div>
                  <Link to="/food-menu" className="btn btn-warning mr-3 mb-2">
                    Recomended for you
                  </Link>
                  <Link
                    to="/food-menu"
                    className="btn btn-warning light mr-3 mb-2"
                  >
                    Salad
                  </Link>
                  <Link
                    to="/food-menu"
                    className="btn btn-warning light mr-3 mb-2"
                  >
                    Breakfast
                  </Link>
                  <Link to="/food-menu" className="btn btn-warning light mb-2">
                    Lunch
                  </Link>
                </div>
                <DietMenus onClick={() => setModalToggle(true)} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4">
          <div className="row">
            <div className="col-xl-12 col-md-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="mr-auto pr-3">
                    <h4 className="text-black fs-20">Current Diet Menu</h4>
                    <p className="fs-13 mb-0">Lorem ipsum dolor sit ame</p>
                  </div>
                  <Link
                    to="/food-menu"
                    data-toggle="modal"
                    data-target="#aAddDietMenus"
                    onClick={() => setModalToggle(true)}
                    className="plus-icon text-white rounded bg-primary"
                  >
                    <i className="las la-plus scale-2" />
                  </Link>
                </div>
                <div className="card-body">
                  <div className="media mb-3">
                    <Link to="ecom-product-detail">
                      <img
                        src={menus9}
                        alt=""
                        className="rounded mr-3"
                        width={86}
                      />
                    </Link>
                    <div className="media-body">
                      <h6 className="fs-16 font-w500">
                        <Link to="ecom-product-detail" className="text-black">
                          Hearty Italian-Style White Bean Soup
                        </Link>
                      </h6>
                      <span className="fs-14">by Andrew</span>
                    </div>
                  </div>
                  <ul className="m-md-auto mt-2 pr-4">
                    <li className="mb-2 text-nowrap">
                      <i className="las la-clock scale5 mr-3" />
                      <span className="fs-14 text-black text-nowrap font-w500">
                        4-6 mins{" "}
                      </span>
                    </li>
                    <li className="mb-2 text-nowrap">
                      <i className="las la-calendar-alt scale5 mr-3" />
                      <span className="fs-14 text-black  font-w500">
                        Breakfast (Monday, Tuesday)
                      </span>
                    </li>
                    <li className="mb-2 text-nowrap">
                      <i className="las la-prescription-bottle scale5 mr-3" />
                      <span className="text-nowrap fs-14 text-primary font-w500">
                        8 Ingridients
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-md-6">
              <div className="card">
                <div className="card-header d-sm-flex d-block border-0 pb-4">
                  <div className="mr-auto pr-3">
                    <h4 className="text-black fs-20">Trending Ingridients</h4>
                    <p className="fs-13 mb-0">
                      Lorem ipsum dolor sit amet, consectetur
                    </p>
                  </div>
                </div>
                <div
                  className="card-body loadmore-content dz-scroll pb-0 pt-0 height320 ps ps--active-y"
                  id="TrendingIngridientsContent"
                >
                  <div className="media border-bottom py-3">
                    <Link to="ecom-product-detail">
                      <img
                        src={menus9}
                        alt=""
                        className="rounded mr-3"
                        width={50}
                      />
                    </Link>
                    <div className="pr-3 mr-auto media-body">
                      <h6 className="fs-16 font-w600 mb-0">
                        <Link to="ecom-product-detail" className="text-black">
                          Strawberry Fruit
                        </Link>
                      </h6>
                      <span className="fs-12">Vitamin A, B, C</span>
                    </div>
                    <div className="text-center">
                      <span className="d-block">
                        <svg
                          width={19}
                          height={9}
                          viewBox="0 0 18 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 0L0 9H18L9 0Z" fill="#0B2A97" />
                        </svg>
                      </span>
                      <span className="d-block fs-16 text-black font-w600">
                        #1
                      </span>
                    </div>
                  </div>
                  <div className="media border-bottom py-3">
                    <Link to="ecom-product-detail">
                      <img
                        src={menus10}
                        alt=""
                        className="rounded mr-3"
                        width={50}
                      />
                    </Link>
                    <div className="pr-3 mr-auto media-body">
                      <h6 className="fs-16 font-w600 mb-0">
                        <Link to="ecom-product-detail" className="text-black">
                          Bananas Fruit
                        </Link>
                      </h6>
                      <span className="fs-12">Vitamin A, B, C</span>
                    </div>
                    <div className="text-center">
                      <span className="d-block">
                        <svg
                          width={19}
                          height={9}
                          viewBox="0 0 18 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 0L0 9H18L9 0Z" fill="#0B2A97" />
                        </svg>
                      </span>
                      <span className="d-block fs-16 text-black font-w600">
                        #2
                      </span>
                    </div>
                  </div>
                  <div className="media border-bottom py-3">
                    <Link to="ecom-product-detail">
                      <img
                        src={menus11}
                        alt=""
                        className="rounded mr-3"
                        width={50}
                      />
                    </Link>
                    <div className="pr-3 mr-auto media-body">
                      <h6 className="fs-16 font-w600 mb-0">
                        <Link to="ecom-product-detail" className="text-black">
                          Orange Fruit
                        </Link>
                      </h6>
                      <span className="fs-12">Vitamin A, B, C</span>
                    </div>
                    <div className="text-center">
                      <span className="d-block">
                        <svg
                          width={19}
                          height={9}
                          viewBox="0 0 18 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 9.00006L18 6.10352e-05H9L0 6.10352e-05L9 9.00006Z"
                            fill="#C51E1E"
                          />
                        </svg>
                      </span>
                      <span className="d-block fs-16 text-black font-w600">
                        #3
                      </span>
                    </div>
                  </div>
                  <div className="media border-bottom py-3">
                    <Link to="ecom-product-detail">
                      <img
                        src={menus12}
                        alt=""
                        className="rounded mr-3"
                        width={50}
                      />
                    </Link>
                    <div className="pr-3 mr-auto media-body">
                      <h6 className="fs-16 font-w600 mb-0">
                        <Link to="ecom-product-detail" className="text-black">
                          Grapes Fruit
                        </Link>
                      </h6>
                      <span className="fs-12">Vitamin A, B, C</span>
                    </div>
                    <div className="text-center">
                      <span className="d-block">
                        <svg
                          width={19}
                          height={9}
                          viewBox="0 0 18 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 0L0 9H18L9 0Z" fill="#0B2A97" />
                        </svg>
                      </span>
                      <span className="d-block fs-16 text-black font-w600">
                        #4
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-center border-0 pt-3 pb-4">
                  <Link
                    className="text-primary dz-load-more"
                    id="TrendingIngridients"
                    rel="ajax/trending-ingridients"
                    to="/food-menu"
                  >
                    View more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FoodMenu;
