//action types
import { CART_ADD_PRODUCT, ASYNC_STATUS, CART_FETCH_CONTENTS } from '../action-types'

//api
import api from "../api/api"

/**
 * Add Product To Shopping Cart
 * 
 * @param product json object contains product info
 */
const addProduct = (product) => {
  console.log(CART_ADD_PRODUCT)

  return {
    type: CART_ADD_PRODUCT,
    product
  }
}

/**
 *  Request
 */
const fetchCartContentRequest = () => {
  return {
    type: CART_FETCH_CONTENTS,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 *  Success
 */
export function fetchCartContentSuccess(data) {
  return {
    type: CART_FETCH_CONTENTS,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  Failure
 */
export function fetchCartContentFailure() {
  return {
    type: CART_FETCH_CONTENTS,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do
 */
export function fetchCartContent(rawData) {
  console.log("fetchCartContentData")
  return dispatch => {
    // dispatch(fetchCartContentRequest())
    dispatch(fetchCartContentSuccess([]))
    // api.getShoppingCart({
    //   data: {
    //     rawData: rawData
    //   },
    //   success: (res) => {
    //     if (res.success == true) {
    //       dispatch(fetchCartContentSuccess(res.data))
    //     } else {
    //       dispatch(fetchCartContentFailure())
    //     }
    //   }
    // })
  }
}

module.exports = {
  addProduct,
  fetchCartContent
}