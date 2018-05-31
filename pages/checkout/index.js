//index.js
//获取应用实例

import api from '../../api/api.js';
import util from '../../utils/util.js';

//购物车辅助操作函数
import { 
  sortBySeller, 
  getOrderTotal
} from '../../utils/cart';

//Redux Action
import { fetchOrderContent } from '../../actions/checkoutAction';

//Redux connection
import { connect } from '../../libs/redux-weapp/wechat-weapp-redux.min';

/**
 * 
 */
let pageConfig = {
  /**
   * 
   */
  data: {
    checkoutContents: [],
    address: null,
    orderTotal: []
  },
  onOK: function() {
    console.log("requestPayment")
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  },
  onAddressTap: function() {
    var scope = this;

    wx.chooseAddress({
      success: function (res) {
        scope.setData({
          address: {
            userName: res.userName,
            postalCode: res.postalCode,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            nationalCode: res.nationalCode,
            telNumber: res.telNumber,
          }
        })
      }
    })
  },
  /**
   * 
   */
  onLoad: function () {
    this.fetchOrderContent(this.data.sellers);
  }
};

/**
 * Redux状态映射函数
 * 
 * @param state redux state对象
 */
const mapStateToData = state => ({
  sellers: sortBySeller(state.checkout.contents),
  orderContents: state.checkout.fetchedOrderContents,
  numberOfProducts: state.checkout.numberOfProducts,
  orderTotal: getOrderTotal(state.checkout.fetchedOrderContents)
})

/**
 * Redux action分发映射射函数
 * 
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchOrderContent: (contents) => dispatch(fetchOrderContent(contents))
})

/**
 * Page页面
 * 
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig))
