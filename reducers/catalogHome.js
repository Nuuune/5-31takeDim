import { CATALOG_FETCH_HOME, ASYNC_STATUS } from '../action-types';

/**
 * Initial State
 */
const initialState = {
  homeData: {
    featured: [],
    latest: [],
    trainers: []
  },
  method: "load",
  fetchStatus: null
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //
    case CATALOG_FETCH_HOME:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            method: action.method,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;

        case ASYNC_STATUS.SUCCESS:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.SUCCESS,
            homeData: action.data
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

      break;

    default:
      return state;
      break;
  }

  return state;
}
