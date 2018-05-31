//action types
import { 
  SNS_FETCH_USER_INFO,
  LOADING_METHOD,
  ASYNC_STATUS
} from "../action-types";

//api
import api from "../api/api"

//SNS_HOME_PAGE_SIZE
import { SNS_HOME_PAGE_SIZE } from '../constants';


/**
 * Fetech Home Request
 */
const fetchUserInfoRequest = (userId, method, pageNo) => {
  return {
    type: SNS_FETCH_USER_INFO,
    userId,
    method,
    pageNo,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
const fetchUserInfoSuccess = (data) => {
  return {
    type: SNS_FETCH_USER_INFO,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
const fetchUserInfoFailure = () => {
  return {
    type: SNS_FETCH_USER_INFO,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do fetchUserInfoData
 *
 * @param userId
 * @param method
 * @param pageNo
 */
const fetchUserInfoData = (userId, loadMethod, pNum) => {
  let pageNo = pNum || 0; 
  let method = loadMethod || LOADING_METHOD.LOAD; 
  
  return (dispatch) => {
    dispatch(fetchUserInfoRequest(userId, method, pageNo))

    api.getUserInfo({
      data: {
        userId,
        pageNo,
        pageSize: SNS_HOME_PAGE_SIZE
      },
      success: (res) => {
        dispatch(fetchUserInfoSuccess({
          userData: res.data
        }));
      }
    });
  }
}

module.exports = {
  fetchUserInfoData
}