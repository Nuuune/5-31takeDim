//action types
import { CHECKOUT_ADD_PRODUCTS, CHECKOUT_FETCH_CONTENTS, ASYNC_STATUS } from '../action-types'

//api
import api from "../api/api"

/**
 * Add Product To Checkout
 * 
 * @param product json object contains product info
 */
const addProducts = (products) => {
  console.log(CHECKOUT_ADD_PRODUCTS)

  return {
    type: CHECKOUT_ADD_PRODUCTS,
    products
  }
}


/**
 *  Request
 */
const fetchOrderContentRequest = () => {
  return {
    type: CHECKOUT_FETCH_CONTENTS,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 *  Success
 */
export function fetchOrderContentSuccess(data) {
  return {
    type: CHECKOUT_FETCH_CONTENTS,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  Failure
 */
export function fetchOrderContentFailure() {
  return {
    type: CHECKOUT_FETCH_CONTENTS,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do
 */
export function fetchOrderContent(rawData) {
  console.log("fetchOrderContentData")
  return dispatch => {
    dispatch(fetchOrderContentRequest())

    api.getShoppingCart({
      data: {
        rawData: rawData
      },
      success: (res) => {
        if (res.success == true) {
          dispatch(fetchOrderContentSuccess(res.data))
        } else {
          dispatch(fetchOrderContentFailure())
        }
      }
    })
  }
}

module.exports = {
  addProducts,
  fetchOrderContent
}