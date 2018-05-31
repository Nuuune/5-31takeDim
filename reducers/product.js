import { CATALOG_FETCH_PRODUCT, ASYNC_STATUS } from '../action-types';

const initialState = {
  productData: null
}

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    //
    case CATALOG_FETCH_PRODUCT:
      switch (action.status) {
        case ASYNC_STATUS.SUCCESS:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.SUCCESS,
            productData: action.data
          };
          break;
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.LOADING
          };
          break;
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.ERROR
          };
          break;
        default:
          return state;
          break;
      }
      break;
    default:
      return state;
      break;
  }

  return state;
}
