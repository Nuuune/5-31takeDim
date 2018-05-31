/**
 * 动态详情页面
 */

//imports

import {isEmpty} from '../../../../utils/util.js';

//Redux actions
import { toggleFollowUser } from '../../../../actions/ucenterAction';
import { fetchFeedData, postFeedCommentData, toggleDiggFeed } from '../../../../actions/feedAction.js';

//redux connection
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import snsbase from '../../snsbase';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, snsbase, {
  /**
   * Page data
   */
  data: {
    feed: null,
    comment: null,
    commentId: null,
    focus: false,
    inputFocus: false,

    swiperCurrent: 0,
    swiperSlidePosition: 1,
    swiperSlideTotal: 0,
    showDialog: false
  },

  /**
   * 监听store state变化
   * 1. 设置动态详情标题
   * 2. 设置分享标题
   * 
   * @param nextState 下一个状态值
   */
  onReceiveState: function (nextState) {
    let feedData = nextState.feed.feedData;

    if (!isEmpty(feedData)) {
      //设置动态详情标题
      wx.setNavigationBarTitle({
        title: feedData.title,
      });

      //设置分享标题
      this.SHARE_TITLE = feedData.title;
      this.SHARE_PATH = this.CONF.u.SOCIAL_FEED_INFO_URL + '?feedId=' + feedData.id;

      if (!isEmpty(feedData.images)) {
        this.SHARE_IMAGE_URL = feedData.images[0];
      }
    }
  },
  
  /**
   * 绑定输入框内容至data对象
   * 
   * @param e event对象
   */
  onCommentInput: function(e) {
    this.setData({
      comment: e.detail.value
    });
  },

  /**
   * 输入框失去焦点时触发
   * 每次失去焦点的时候，重置回复commentId
   * 
   * @param e event对象
   */
  onCommentInputBlur: function(e) {
    this.setData({
      inputFocus: false
    });
  },

  /**
   * 输入框聚焦时触发
   * 
   * @param e event对象
   */
  onCommentInputFocus: function (e) {
    this.setData({
      inputFocus: true
    });
  },
  
  /**
   * 提交评论
   *
   * @param e event对象
   */
  onSubmitTap: function(e) {
    if (isEmpty(this.data.comment)) {
      wx.showToast({
        title: '请输入评论。。。'
      })

      this.setData({
        focus: true
      });

      return;
    }

    let feedId = this.data.feed.id;
    let commentId = isEmpty(this.data.commentId) ? null : this.data.commentId;
    let content = this.data.comment;

    this.postFeedCommentData(feedId, commentId, content);

    wx.showToast({
      title: '评论提交成功！',
    });

    this.setData({
      comment: '',
      focus: false,
      commentId: null
    });
  },

  /**
   * 回复评论，设置回复评论id
   * 
   * @param e event
   */
  onReCommentTap: function(e) {
    let commentId = e.currentTarget.dataset.commentId;
    
    this.setData({
      commentId: commentId,
      focus: true
    });
  },

  /**
   * 当图片被点击 
   * 
   * @param e event对象
   */
  onImageTap: function (e) {
    let feedId = e.currentTarget.dataset.feedId;
    let imgIdx = e.currentTarget.dataset.imgIdx;
    let feed = this.data.feed;

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000'
    })

    this.setData({
      showDialog: !this.data.showDialog,
      swiperImages: feed.images,
      swiperCurrent: imgIdx,
      swiperSlidePosition: (imgIdx + 1),
      swiperSlideTotal: feed.images.length
    });
  },

  /**
   * 当轮播图被滑动
   */
  onSwiperChange: function (e) {
    this.setData({
      swiperSlidePosition: e.detail.current + 1
    })
  },

  /**
   * 关闭弹出对话框
   * 
   * @param e event对象
   */
  onDialogClose: function (e) {

    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })

    this.setData({
      showDialog: false
    });
  },

  /**
   * 点赞列表
   * 
   * @param e event
   */
  onDigUsersMoreTap: function(e) {
    console.log(e)
  },


  /**
   * 点击进入用户详情
   */
  onUserTap: function (e) {
    let userId = e.currentTarget.dataset.userId;

    wx.navigateTo({
      url: '/pages/sns/user/info/index?userId=' + userId,
    });
  },

  /**
   * 监听页面加载成功
   */
  onLoad: function (options) {
    // console.log(options);
    this.fetchFeedData(options.feedId);
    // this.fetchFeedData(33);
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  feed: state.feed.feedData
});

/**
 * Map Dispatch to Page
 */
const mapDispatchToPage = dispatch => ({
  fetchFeedData: (feedId) => dispatch(fetchFeedData(feedId)),
  postFeedCommentData: (feedId, commentId, content) => dispatch(postFeedCommentData(feedId, commentId, content)),
  toggleFollowUser: (userId, subscribe) => dispatch(toggleFollowUser(userId, subscribe)),
  toggleDiggFeed: (feedId, digg) => dispatch(toggleDiggFeed(feedId, digg))
});

/**
 * Page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
