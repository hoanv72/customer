import * as requestFrom from "./productCrud";
import {ProductsSlice, callTypes} from "./productSlice";

const { actions } = ProductsSlice;

export const createdProduct = (data, oraganizeId) => dispatch => {
    dispatch(actions.startCall({ callTypes: callTypes.action }))
    return requestFrom.createdProduct(data,oraganizeId)
        .then(response => {
            const { data } = response;
            if (data.code === 0) {
                fetchsProduct(oraganizeId)
                return data
            } else {
                return data
            }
        })
        .catch(error => {
            console.log(error);
        })
}


export const createdPrice = (data, oraganizeId,id) => dispatch => {
    dispatch(actions.startCall({ callTypes: callTypes.action }))
    return requestFrom.createdPrice(data,oraganizeId,id)
        .then(response => {
            return response.data

        })
        .catch(error => {
            console.log(error);
        })
}

export const updatePrice = (data, oraganizeId,id,priceId) => dispatch => {
    dispatch(actions.startCall({ callTypes: callTypes.action }))
    const dataUpdate = {
        discount_even: data.discount_even,
        discount_odd: data.discount_odd,
        price_even: data.price_even,
        price_odd: data.price_odd,
        vat:data.vat
    }
    return requestFrom.updatePrice(dataUpdate,oraganizeId,id,priceId)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}

export const fetchsProduct = (oraganizeId) => dispatch => {
    dispatch(actions.startCall({ callTypes: callTypes.list }))
    return requestFrom.fetchsProduct(oraganizeId)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}

export const fetchPriceProduct = (oraganizeId,id) => dispatch => {
    dispatch(actions.startCall({ callTypes: callTypes.list }))
    return requestFrom.fetchsPriceDetail(oraganizeId,id)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}