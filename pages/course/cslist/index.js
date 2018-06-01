//imports
import api from '../../../api/api';
import util from '../../../utils/util';

//async status
import { ASYNC_STATUS } from "../../../action-types";

//Redux actions
import {fetchCourseData} from '../../../actions/courseAction';

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
  onLoad: function() {
    this.fetchCourseData();
  },
  onReachBottom: function() {
    console.log('sss');
    this.fetchCourseData();
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
  fetchCourseData: () => dispatch(fetchCourseData())
});

/**
 * Page页面
 *
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
