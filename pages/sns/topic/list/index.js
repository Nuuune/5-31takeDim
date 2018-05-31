/**
 * 话题列表
 */

//constants
import constants from '../../../../constants.js';

//async status
import { ASYNC_STATUS } from "../../../../action-types";

//redux actions
import { fetchTopicListData } from '../../../../actions/snsTopicAction';

//reduct connect method, connect state and props
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../../../base';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {

  //微信分享标题
  SHARE_TITLE: constants.s.SOCIAL_TOPIC_LIST_HOME_TITLE,

  //微信分享路径
  SHARE_PATH: '/pages/sns/topic/list/index',

  //微信分享图片
  SHARE_IMAGE_URL: null,

  /**
   * 
   */
  data: {
    topicList: null
  },


  /**
   * 
   */
  onLoad: function () {
    this.fetchTopicListData();
  }
});

const mapStateToData = state => ({
  topicList: state.snsTopic.topicList
})

const mapDispatchToPage = dispatch => ({
  fetchTopicListData: () => dispatch(fetchTopicListData())
})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

/**
 * Page
 */
Page(nextPageConfig)
