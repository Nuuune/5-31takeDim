//action types
import { COURSE_FETCH_LIST, ASYNC_STATUS, COURSE_CLEAR_ERRMSG, COURSE_CLEAR_LIST,
  COURSE_SET_COURSEDETAIL, COURSE_CLEAR_COURSEDETAIL} from '../action-types'

/**
 * Initial State
 */
const initialState = {
  courselist: [],
  isFetching: false,
  errorMsg: "",
  courseDetail: null
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
    case COURSE_CLEAR_ERRMSG:
      return {
        ...state,
        errorMsg: ""
      };
    case COURSE_CLEAR_LIST:
      return {
        ...state,
        courselist: []
      };
    case COURSE_CLEAR_COURSEDETAIL:
      return {
        ...state,
        courseDetail: null
      };
    case COURSE_SET_COURSEDETAIL:
      return {
        ...state,
        courseDetail: action.courseDetail
      }
    // none
    default:
      return state;
  }
}
