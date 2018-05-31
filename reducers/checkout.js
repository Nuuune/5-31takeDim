//action types
import { CHECKOUT_ADD_PRODUCTS, CHECKOUT_FETCH_CONTENTS, ASYNC_STATUS } from '../action-types'

/**
 * Initial State
 */
const initialState = {
  contents: [],
  fetchedOrderContents: [],
  numberOfProducts: 0,
  orderTotal: 0,
  address: null
};

const getnumberOfProducts = (contents) => {
  let quantity = 0;

  contents.forEach((item, index) => {
    quantity += item.quantity;
  });

  return quantity;
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    //
    case CHECKOUT_ADD_PRODUCTS:
      let products = action.products;

      return {
        ...state,
        contents: products,
        numberOfProducts: getnumberOfProducts(products)
      };
      break;
    //添加商品进入购物车
    case CHECKOUT_FETCH_CONTENTS:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;

        case ASYNC_STATUS.SUCCESS:
          console.log(action)
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.SUCCESS,
            fetchedOrderContents: action.data
          };
          break;

        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.ERROR
          };
          break;
        default:
          return state;
          break;
      }

    default:
      return state;
      break;
  }

  return state;
}
