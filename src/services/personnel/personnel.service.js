import { instanceAxios as axios, API } from '../index';

function getToken() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  if (user !== null && user.token) {
    return user.token;
  }

  return null;
}

export const personnelService = {
  getListUser,
  getListPersonnel,
  getClientDetail,
  createList,
  deleteList,
  updateList,
  createUser,
  deleteUser,
  addUserToTree,
};

async function getListUser(role, oraganizeId) {
  try {
    const response = await axios.get(API.personal + '/user', {
      params: {
        role
      },
      headers: {
        'hdo-ip': '127.0.0.3',
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

async function getListPersonnel(id, oraganizeId) {
  try {
    const response = await axios.get(`${API.personal}`, {
      params: {
        id
      },
      headers: {
        'hdo-ip': '127.0.0.3',
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

async function getClientDetail(url, id, oraganizeId) {
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

async function deleteList(url, id, oraganizeId) {
  try {
    const response = await axios.delete(`${API.customer}${url}/${id}`, {
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

async function createUser(data, oraganizeId) {
  try {
    const response = await axios.post(
      `${API.personal}/user`,
      data,
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

async function deleteUser(userId, oraganizeId) {
  try {
    const response = await axios.delete(
      `${API.personal}/user/1/tree`,
      {
        headers: {
          'hdo-ip': '127.0.0.3',
          oraganize: oraganizeId,
          Authorization: `Bearer ${getToken()}`,
        },
        data: { 'customer_user': userId }
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

async function addUserToTree({ userId, treeId, type }, oraganizeId) {
  try {
    const response = await axios.post(
      `${API.personal}/user/${treeId}/tree`,
      {
        "customer_user": userId,
        type,
      },
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
