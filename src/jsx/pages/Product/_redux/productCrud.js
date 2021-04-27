import axios from "axios";

const DOMAIN = process.env.REACT_APP_DOMAIN;

const URL_PRODUCT = 'product';

function getToken() {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  
    if (user !== null) {
      return user.token;
    }
  
    return null;
  }
export const createdProduct = (data,oraganizeId) => {
    return axios.post(`${DOMAIN}/${URL_PRODUCT}`,data,{
        headers: {
          oraganize: oraganizeId,
          Authorization: `Bearer ${getToken()}`,
        },
      })
}

export const updatePrice = (data,oraganizeId,id,priceId) => {
  return axios.put(`${DOMAIN}/${URL_PRODUCT}/${id}/price/${priceId}`,data,{
    headers: {
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    })
}
export const createdPrice = (data,oraganizeId,id) => {
  return axios.post(`${DOMAIN}/${URL_PRODUCT}/${id}/price`,data,{
    headers: {
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    })
}
export const fetchsProduct = (oraganizeId) => {
  return axios.get(`${DOMAIN}/${URL_PRODUCT}`,{
      headers: {
        oraganize: oraganizeId,
        Authorization: `Bearer ${getToken()}`,
      },
    })
}

export const fetchsPriceDetail = (oraganizeId,id) => {
  return axios.get(`${DOMAIN}/${URL_PRODUCT}/${id}/price`,{
    headers: {
      oraganize: oraganizeId,
      Authorization: `Bearer ${getToken()}`,
    },
  })
}