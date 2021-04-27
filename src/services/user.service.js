import { instanceAxios as axios, API } from './index';

export const userService = {
  login,
  logout,
};

async function login(username, password) {
  try {
    const response = await axios.post(API.login, {
      username: username,
      password: password,
    });
    if (response.data.code === 2) {
      throw new Error('Wrong username or password');
    }
    return response.data;
  } catch (error) {
    return {
      code: 2,
      message: error.message,
    };
  }
}

async function logout(token) {
  try {
    const response = await axios.post(API.logout, null, {
      headers: {
        'hdo-ip': '127.0.0.3',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.code === -2) {
      throw new Error('Invalid token');
    }
    return response.data;
  } catch (err) {
    return {
      code: -2,
      message: err.message,
    };
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
