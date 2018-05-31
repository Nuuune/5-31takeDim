import { SNS_FETCH_TOPIC_LIST, SNS_FETCH_TOPIC, ASYNC_STATUS } from '../action-types';

/**
 * Initial State
 */
const initialState = {
  topicList: null,
  topic: null
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //SNS_FETCH_TOPIC_LIST
    case SNS_FETCH_TOPIC_LIST:
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
            topicList: action.data.topics
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

    //
    case SNS_FETCH_TOPIC:
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
            topic: action.data.topic
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
