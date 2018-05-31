/**
 * 频道详情
 */

import { isEmpty } from '../../../../utils/util.js';

//redux actions
import { fetchChannelInfoData } from '../../../../actions/snsChannelAction';

//reduct connect method, connect state and props
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import snsbase from '../../snsbase';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, snsbase, {
  /**
   * 
   */
  data: {
    channelInfo: null
  },

  /**
   * 监听store state变化
   * 1. 设置动态详情标题
   * 2. 设置分享标题
   * 
   * @param nextState 下一个状态值
   */
  onReceiveState: function (nextState) {
    let channelInfo = nextState.snsChannel.channelInfo;

    console.log(channelInfo)

    if (!isEmpty(channelInfo)) {
      //设置动态详情标题
      wx.setNavigationBarTitle({
        title: channelInfo.name,
      });

      //设置分享标题
      this.SHARE_TITLE = channelInfo.name;
      this.SHARE_PATH = "/pages/sns/channel/info/index?channelId=" + channelInfo.id;
      this.SHARE_IMAGE_URL = channelInfo.coverImage;
    }
  },

  /**
   * 
   */
  onPostFeedTap: function(e) {
    wx.navigateTo({
      url: '/pages/sns/feed/post/index?channelId=' + this.data.channelInfo.id
    })
  },

  /**
   * 
   */
  onLoad: function (options) {
    this.fetchChannelInfoData(options.channelId);
    // this.fetchChannelInfoData(2);
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  channelInfo: state.snsChannel.channelInfo
});

/**
 * Map Dispatch to Page
 */
const mapDispatchToPage = dispatch => ({
  fetchChannelInfoData: (channelId) => dispatch(fetchChannelInfoData(channelId))
});

/**
 * Page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
