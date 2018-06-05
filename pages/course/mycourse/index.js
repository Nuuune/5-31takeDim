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
    istab1: true
  },
  toggleTab: function() {
    this.setData({istab1: !this.data.istab1})
  }
};

/**
 * Redux状态映射函数
 *
 * @param state redux state对象
 */
const mapStateToData = state => ({

});

/**
 * Redux action分发映射射函数
 *
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({

});

/**
 * Page页面
 *
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
