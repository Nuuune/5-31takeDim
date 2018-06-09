import constants from "../../../constants";

import base from "../../base";

//Redux actions
import {wxPay} from '../../../actions/courseAction';

//Redux
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

let pageConfig = Object.assign({}, base, {
  data: {
    courseDetail: {}
  },
  onLoad: function(e) {
  },
  buy: function(e) {
    let {id} = this.data.courseDetail;
    this.wxPay({
      param: {
        id: id
      },
      success: () => {
        wx.showToast({
          title: `支付成功`
        })
        wx.redirectTo({
          url: `../csdetail/index?id=${id}`
        })
      }
    })
  }
});

/**
 * Redux状态映射函数
 *
 * @param state redux state对象
 */
const mapStateToData = state => ({
  //课程数据
  courseDetail: state.course.courseDetail
});


/**
 * Redux action分发映射射函数
 *
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  wxPay: (option) => dispatch(wxPay(option))
});

Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
