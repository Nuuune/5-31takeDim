//imports
import api from '../../../api/api';
import util from '../../../utils/util';

//async status
import { ASYNC_STATUS } from "../../../action-types";

//Redux actions
import {fetchCourseData, clearErrMsg} from '../../../actions/courseAction';

//Redux
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

/**
 * Product Page Config Object
 */
const pageConfig ={
  data: {
    courseList: null,
    isFetching: false,
    errorMsg: ''
  },
  onLoad: function(e) {
    this.fetchCourseData();
    console.log(e);
  },
  onReachBottom: function() {
    this.fetchCourseData();
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.clearErrMsg();
    this.fetchCourseData({
      success: () => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
      fail: () => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  }
};

/**
 * Redux状态映射函数
 *
 * @param state redux state对象
 */
const mapStateToData = state => ({
  //课程列表数据
  courseList: state.course.courselist,
  //加载状态
  isFetching: state.course.isFetching,
  errorMsg: state.course.errorMsg
});

/**
 * Redux action分发映射射函数
 *
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchCourseData: (option) => dispatch(fetchCourseData(option)),
  clearErrMsg: () => dispatch(clearErrMsg())
});

/**
 * Page页面
 *
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
