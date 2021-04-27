import { instanceAxios as axios, API } from "../index";

function getToken() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (user !== null && user.token) {
    return user.token;
  }

  return null;
}

export const routeService = {
  getListRoute,
  getListClient,
  getListEmployee,
  createRoute,
};

async function getListRoute(oraganizeId) {
  try {
    const response = await axios.get(API.route, {
      headers: {
        "hdo-ip": "127.0.0.3",
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}

async function getListClient(oraganizeId) {
  try {
    const response = await axios.get(API.customer, {
      headers: {
        "hdo-ip": "127.0.0.3",
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}

async function getListEmployee(oraganizeId) {
  try {
    const response = await axios.get(`${API.personal}?role=employee`, {
      headers: {
        "hdo-ip": "127.0.0.3",
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}

async function createRoute(oraganizeId, data) {
  try {
    const response = await axios.post(API.route, data, {
      headers: {
        "hdo-ip": "127.0.0.3",
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}
