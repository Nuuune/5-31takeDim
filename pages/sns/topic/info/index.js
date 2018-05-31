/**
 * 话题详情
 */

//constants
import constants from '../../../../constants.js';

//async status
import { ASYNC_STATUS } from "../../../../action-types";

//redux actions
import { fetchTopicData } from '../../../../actions/snsTopicAction';

//reduct connect method, connect state and props
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//import util
import util from '../../../../utils/util';

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
    topic: null
  },

  /**
   * On receive state
   * 
   * @param nextState object
   */
  onReceiveState: function (nextState) {
    let topicData = nextState.snsTopic.topic;

    if (!util.isEmpty(topicData)) {
      wx.setNavigationBarTitle({
        title: topicData.name,
      });

      //设置分享标题
      this.SHARE_TITLE = topicData.name;
      this.SHARE_PATH = '/pages/sns/topic/info/index?topicId=' + topicData.id;

      if (!util.isEmpty(topicData.coverImage)) {
        this.SHARE_IMAGE_URL = topicData.coverImage;
      }
    }
  },

  /**
   * 
   */
  onLoad: function (options) {
    // this.fetchTopicData(2);
    this.fetchTopicData(options.topicId);
  }
});

const mapStateToData = state => ({
  topic: state.snsTopic.topic
})

const mapDispatchToPage = dispatch => ({
  fetchTopicData: (topicId) => dispatch(fetchTopicData(topicId))
})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

/**
 * Page
 */
Page(nextPageConfig)
