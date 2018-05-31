//action types
import { CATALOG_FETCH_PRODUCT, ASYNC_STATUS } from "../action-types";

//api
import api from "../api/api"

/**
 *  Request
 */
const fetchProductRequest = () => {
  return {
    type: CATALOG_FETCH_PRODUCT,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 *  Success
 */
export function fetchProductSuccess(data) {
  return {
    type: CATALOG_FETCH_PRODUCT,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  Failure
 */
export function fetchProductFailure() {
  return {
    type: CATALOG_FETCH_PRODUCT,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do
 */
export function fetchProductData(productId) {
  console.log("fetchProductData")
  return dispatch => {
    dispatch(fetchProductRequest())

    api.getProductData({
      data: {
        productId: productId
      },
      success: (res) => {
        if (res.success == true) {
          dispatch(fetchProductSuccess(res.data))
        } else {
          dispatch(fetchProductFailure())
        }
      }
    })
  }
}

module.exports = {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchProductData
}