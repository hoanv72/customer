import { instanceAxios as axios, API } from "../index";

function getToken() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (user !== null) {
    return user.token;
  }

  return null;
}

export const clientService = {
  getList,
  getClientDetail,
  createList,
  deleteList,
  updateList,
};

async function getList(url, oraganizeId) {
  try {
    const response = await axios.get(API.customer + url, {
      headers: {
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

async function getClientDetail(id, oraganizeId) {
  try {
    const response = await axios.get(`${API.customer}/${id}`, {
      headers: {
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

async function createList(url, values, oraganizeId) {
  console.log("urlcrl", url);
  try {
    const response = await axios.post(
      API.customer + url,
      { ...values },
      {
        headers: {
          oraganize: oraganizeId,
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}
// ____________________________________________
async function updateList(url, id, values, oraganizeId) {
  try {
    const response = await axios.put(
      `${API.customer}${url}/${id}`,
      { ...values },
      {
        headers: {
          oraganize: oraganizeId,
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}

async function deleteList(id, contactId, oraganizeId) {
  try {
    const response = await axios.delete(
      `${API.customer}/${id}/contact/${contactId}`,
      {
        headers: {
          oraganize: oraganizeId,
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response;
  } catch (error) {
    return {
      code: -2,
      message: error.message,
    };
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
