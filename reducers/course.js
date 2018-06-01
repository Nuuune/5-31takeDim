//action types
import { COURSE_FETCH_LIST, ASYNC_STATUS } from '../action-types'

/**
 * Initial State
 */
const initialState = {
  courselist: [],
  isFetching: false,
  errorMsg: ""
};

/**
 * Course Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Fetch Course
    case COURSE_FETCH_LIST:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            isFetching: true
          };
        case ASYNC_STATUS.SUCCESS:
          return {
            ...state,
            courselist: state.courselist.concat(action.data),
            isFetching: false
          };
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            isFetching: false,
            errorMsg: action.errorMsg
          };
        default:
          console.error(`未知的action.status`);
          return state;
      };
    // none
    default:
      return state;
  }
}
