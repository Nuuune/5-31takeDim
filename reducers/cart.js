//action types
import { CART_LOAD_STORAGE, CART_ADD_PRODUCT, CART_FETCH_CONTENTS, ASYNC_STATUS } from '../action-types'

/**
 * Initial State
 */
const initialState = {
  contents: [], 
  fetchedCartContents: null,
  numberOfProducts: 0,
  itemsCheckStatus: {},
  cartTotal: 0
};

/**
 * Add Product
 * 
 * @param contents
 * @paam product
 */
const addProduct = (contents, product) => {
  let itemIdx = -1;
  
  //check 
  contents.forEach((item, index) => {
    if (item.productId == product.productId) {
      itemIdx = index;
    }
  });

  //new product
  if (itemIdx == -1) {
    contents.push(product);
  } 
  //update product
  else {
    contents[itemIdx].quantity += product.quantity;
  }

  return contents;
};

const getNumberOfProducts = (contents) => {
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
    //购物车初始化，从本地storage加载购物车
    case CART_LOAD_STORAGE:
      return {
        ...state,
        contents: action.contents,
        numberOfProducts: getNumberOfProducts(action.contents)
      };
    //添加商品进入购物车
    case CART_ADD_PRODUCT:
      //content
      let contents = addProduct(state.contents, action.product);

      //save to storage
      wx.setStorageSync("cart", contents);

      return {
        ...state,
        contents: contents,
        numberOfProducts: getNumberOfProducts(contents)
      };
      break;
    //添加商品进入购物车
    case CART_FETCH_CONTENTS:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;

        case ASYNC_STATUS.SUCCESS:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.SUCCESS,
            fetchedCartContents: action.data
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
 