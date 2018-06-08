/**
 * Copyright (C), 2017 InnoSolutions
 *
 * File Name: /pages/ucenter/index/index
 *
 * Author: InnoSolutions Team
 * Description: 短信登录页
 */

//获取应用实例
import api from '../../../api/api';
import util from '../../../utils/util';
import { ASYNC_STATUS, SET_USER_TOKEN} from "../../../action-types";

//redux connect
import {connect} from '../../../libs/redux-weapp/wechat-weapp-redux.min';

//import action
import { fetchLogin } from '../../../actions/ucenterAction';

//页面配置base对象
import base from '../../base';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {

  /**
   * 页面数据对象
   */
  data: {
    mobile: null,
    vcode: null,
    btnSmsText: '发送验证码',
    comeUrl: null,
    vtoken: null,
    errMsg: null,
    token: null
  },

  /**
   * 当接受到Redux下一个状态
   *
   * @param nextState 下一个状态对象
   */
  // onReceiveState: function (nextState) {
  //   //登录失败
  //   //
  //   if (nextState.ucenter.status == ASYNC_STATUS.ERROR) {
  //     wx.showToast({
  //       title: '登录失败！',
  //     })
  //   }
  //
  //   //登录成功
  //   //
  //   if (this.data.isLogin == false && nextState.ucenter.isLogin == true) {
  //     //退出登录页
  //     wx.navigateBack();
  //
  //     //登录成功回调
  //     if (!util.isEmpty(nextState.ucenter.loginSuccessCB)) {
  //       nextState.ucenter.loginSuccessCB();
  //     }
  //
  //     //登录成功跳转
  //     if (!util.isEmpty(nextState.ucenter.loginSuccessUrl)) {
  //       wx.navigateTo({
  //         url: nextState.ucenter.loginSuccessUrl,
  //       })
  //     }
  //   }
  // },

  /**
   * 手机输入框输入事件
   *
   * @paramm e event对象
   */
  onMobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  /**
   * 验证码输入框输入事件
   *
   * @paramm e event对象
   */
  onVcodeInput: function (e) {
    this.setData({
      vcode: e.detail.value
    });
  },

  /**
   * 点击发送验证码
   *
   * @paramm e event对象
   */
  onSendVcodeTap: function (e) {
    if (!util.isEmpty(this.data.mobile)) {
      api.sendSMS({
        method: 'POST',
        data: {
          mobile: this.data.mobile
        },
        success: (res) => {
          this.setData({vtoken: res.data});
        }
      })

      //send code
      console.log(this.data.mobile)
    }
  },

  /**
   * 点击登录
   *
   * @paramm e event对象
   */
  onLoginTap: function (e) {
    console.log(e);
    let {mobile, vcode, token, vtoken} = this.data;

    if (util.isEmpty(mobile)) {
      wx.showToast({
        title: '请输入手机号！',
        icon: `none`
      })

      return;
    }

    if (util.isEmpty(vcode)) {
      wx.showToast({
        title: '请输入验证码！',
        icon: `none`
      })

      return;
    }

    this.fetchLogin({mobile, vcode, token, vtoken}, {
      success: () => {
        wx.redirectTo({
          url: this.data.comeUrl
        })
      },
      fail: () => {
        wx.showToast({
          title: `失败: ${this.data.errMsg}`
        })
      }
    })
  },




  /**
   *
   */
  onLoad: function(e) {
    this.setData({comeUrl: e.url});
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  nickname: state.ucenter.nickname,
  avatar: state.ucenter.avatar,
  isLogin: state.ucenter.isLogin,
  token: state.ucenter.token,
  errMsg: state.ucenter.errMsg,
  code: state.ucenter.code
});

/**
 * Map Redux Action to Page
 */
const mapDispatchToPage = dispatch => ({
  fetchLogin: (params, options) => dispatch(fetchLogin(params, options)),
  setToken: (token) => dispatch({type: SET_USER_TOKEN, token: token})
});

/**
 * Map Dispatch to Page
 */
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);

/**
 * Page
 */
Page(nextPageConfig);
