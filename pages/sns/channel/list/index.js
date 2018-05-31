/**
 * 频道列表
 */

//constants
import constants from '../../../../constants.js';

import api from "../../../../api/api";

//async status
import { ASYNC_STATUS } from "../../../../action-types";

//redux actions
import { fetchChannelListData } from '../../../../actions/snsChannelAction';

//reduct connect method, connect state and props
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

import base from '../../../base';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {
  /**
   * 
   */
  data: {
    channelList: null
  },

  /**
   * 关注频道
   * 
   * @param e
   */
  onFollowTap: function(e) {
    let channelId = e.currentTarget.dataset.channelId;

    api.followChannel({
      method: "POST",
      data: {
        channelId: channelId
      },
      success: (res) => {

      }
    });
  },

  /**
   * 
   */
  onLoad: function () {
    this.fetchChannelListData();
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  channelList: state.snsChannel.channelList
})

/**
 * Map Dispatch to Page
 */
const mapDispatchToPage = dispatch => ({
  fetchChannelListData: () => dispatch(fetchChannelListData())
})

/**
 * Page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig))
