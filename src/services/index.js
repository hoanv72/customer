import axios from "axios";

const DOMAIN = process.env.REACT_APP_DOMAIN;

const dmsURL = (otherSegmenst) => `${DOMAIN}/${otherSegmenst}`;

function getToken() {
  // wrong token format -> remove item -> redirect to login page
  if (localStorage.getItem("user") === "undefined") {
    localStorage.removeItem("user");
    return null;
  }

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (user && user.token) {
    return user.token;
  }

  return null;
}

export const API = {
  login: dmsURL("login"),
  logout: dmsURL("logout"),
  customer: dmsURL("client"),
  admin: dmsURL("admin"),
  categories: dmsURL("category"),
  route: dmsURL("route"),
  personal: dmsURL("personnel"),
};

const defaultOptions = {
  headers: {
    common: {
      "Content-Type": "application/json",
      "hdo-ip": "127.0.0.2",
      Authorization: `Bearer ${getToken()}`,
    },
  },
};

export const instanceAxios = axios.create(defaultOptions);
