/**
 * 社交首页
 */

//常量
import constants from '../../../constants';

import api from '../../../api/api';
import upload from '../../../utils/upload';

//异步加载状态
import { SNS_POST_FEED, LOADING_METHOD, ASYNC_STATUS } from "../../../action-types";

//redux actions
import { fetchSNSHomeData } from '../../../actions/snsHomeAction';
import { addFeedImages, addFeedLocation, toggleDiggFeed } from '../../../actions/feedAction';
import { toggleFollowUser } from '../../../actions/ucenterAction';

//reduct connect method, connect state and props
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import snsbase from '../snsbase';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, snsbase, {

  //微信分享标题
  SHARE_TITLE: constants.s.SOCIAL_HOME_TITLE,
  
  //微信分享路径
  SHARE_PATH: '/pages/sns/home/index',

  //微信分享图片
  SHARE_IMAGE_URL: null,

  /**
   * 页面对象
   */
  data: {
    containerClass: "container",
    tabData: {
      scroll: true,
      selectedId: 0,
      list: [
        { id: 0, title: "推荐" },
        { id: 1, title: "关注" }
      ]
    },
    feeds: null,
    hasMore: true,
    swiperCurrent: 1
  },

  /**
   * 轮播图点击事件
   */
  onBannerTap: function(e) {
    let bannerIdx = e.currentTarget.dataset.bannerIdx;
    let bannerData = this.data.banners[bannerIdx];

    switch (bannerData.relatedType) {
      //动态详情
      //
      case "PRODUCT":
        wx.navigateTo({
          url: '/pages/catalog/product/index?productId=' + bannerData.relatedId
        })
        break;

      case "CATEGORY":
        wx.navigateTo({
          url: '/pages/catalog/category/index?categoryId=' + bannerData.relatedId
        })
        break;


      case "ARTICLE":
        wx.navigateTo({
          url: '/pages/catalog/product/index?productId=' + bannerData.relatedId
        })
        break;

      case "CHANNEL":
        wx.navigateTo({
          url: '/pages/catalog/product/index?productId=' + bannerData.relatedId
        })
        break;

      case "TOPIC":
        wx.navigateTo({
          url: '/pages/catalog/product/index?productId=' + bannerData.relatedId
        })
        break;

      case "FEED":
        wx.navigateTo({
          url: '/pages/catalog/product/index?productId=' + bannerData.relatedId
        })
        break;
    }
  },

  /**
   * on Page Scroll
   * 
   * @param e event object
   */
  onPageScroll: function (e) {
    // console.log(this.data.containerClass)
    if ((e.scrollTop > 0) && (this.data.containerClass == "container")) {
      this.setData({
        containerClass: "container fix-head"
      });
    } else if ((e.scrollTop == 0) && (this.data.containerClass == "container fix-head")) {
      this.setData({
        containerClass: "container"
      });
    }
  },

  /**
   * On receive state
   * 
   * @param nextState object
   */
  onReceiveState: function (nextState) {
    //刷新成功或者失败都需要停止refresh状态
    if (
      (nextState.snsHome.method == LOADING_METHOD.REFRESH) &&
      (nextState.snsHome.fetchStatus == ASYNC_STATUS.SUCCESS) || (nextState.snsHome.fetchStatus == ASYNC_STATUS.ERROR)) {
      wx.stopPullDownRefresh();
    }
  },


  /**
   * Handler swiper change event, and update page index
   * 
   * @param e event object
   */
  onSwiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current + 1
    })
  },



  /**
   * 
   */
  _handleZanTabChange: function (e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var selectedId = dataset.itemId;
    var data = { componentId, selectedId };

    console.log(selectedId)

    if (selectedId == 1) {
      // this.setData({
      //   tabData: {
      //     scroll: true,
      //     selectedId: 1,
      //     list: [
      //       { id: 0, title: "推荐" },
      //       { id: 1, title: "关注" }
      //     ]
      //   }
      // });

      this.fetchSNSHomeData(LOADING_METHOD.LOAD, this.CONF.SNS_TAB_FOLLOWED);
    } else {
      // this.setData({
      //   tabData: {
      //     scroll: true,
      //     selectedId: 0,
      //     list: [
      //       { id: 0, title: "推荐" },
      //       { id: 1, title: "关注" }
      //     ]
      //   }
      // });

      this.fetchSNSHomeData(LOADING_METHOD.LOAD, this.CONF.SNS_TAB_RECOMMEND);
    }

    console.info('[zan:tab:change]', data);
    // if (this.handleZanTabChange) {
    //   this.handleZanTabChange(data);
    // } else {
    //   console.warn('页面缺少 handleZanTabChange 回调函数');
    // }
  },
  /**
   * 动态发布按钮点击处理事件
   * 
   * @param e event
   */
  onPostFeedTap: function (e) {
    let scope = this;

    this.requireAuth(() => {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths

          if (tempFilePaths.length > 0) {
            let count = tempFilePaths.length;
            let uploadedImages = [];
            let thumbnailImages = [];

            wx.showToast({
              title: '图片上传中。。。',
              icon: 'loading',
              duration: 10000
            });

            tempFilePaths.forEach(image => {
              upload.aliyunUploadFile(
                image,
                constants.ALIYUN_FEED_UPLOAD_PATH,
                "",
                function (file) {
                  //count自减
                  count--;

                  //push data into images
                  uploadedImages.push(constants.ALIYUN_ENDPOINT + file);

                  console.log(constants.ALIYUN_ENDPOINT + file)

                  //上传完成则隐藏toast
                  if (count == 0) {
                    wx.hideToast();
                    scope.addFeedImages(uploadedImages);
                  }
                }, function (a) {
                  console.log(a)
                });
            });

            wx.navigateTo({
              url: scope.CONF.u.SOCIAL_FEED_POST_URL,
            })

            console.log(tempFilePaths)
          }
        }
      });
    });
  },

  onTopicTap: function(e) {
    let topicId = e.currentTarget.dataset.topicId;
    
    wx.navigateTo({
      url: constants.u.SOCIAL_TOPIC_INFO_URL + '?topicId=' + topicId
    });
  },

  /**
   * Pull down refresh
   */
  onPullDownRefresh: function (e) {
    this.fetchSNSHomeData(LOADING_METHOD.REFRESH, this.data.selectedTab);
  },

  /**
   * Page on Load
   */
  onLoad: function () {
    this.fetchSNSHomeData(LOADING_METHOD.LOAD, this.data.selectedTab);
  },

  /**
   * 上拉翻页
   * 
   * @param e event对象
   */
  onReachBottom: function(e) {
    //如果页面在加载中或者页面加载完，则不进行页面加载
    if ((this.data.loadingStatus == ASYNC_STATUS.LOADING) || (this.data.hasMore == false)) {
      return;
    }
    
    this.fetchSNSHomeData(LOADING_METHOD.LOADMORE, this.data.selectedTab, this.data.pageNo + 1);
  }
});


/**
 * Redux Map State To Date
 * 
 * @param state object
 */
const mapStateToData = state => ({
  selectedTab: state.snsHome.selectedTab,
  loadMethod: state.snsHome.method,
  banners: state.snsHome.banners,
  feeds: state.snsHome.feeds,
  hasMore: state.snsHome.hasMore,
  pageNo: state.snsHome.pageNo,
  tabData: {
    scroll: true,
    selectedId: state.snsHome.selectedTab == constants.SNS_TAB_RECOMMEND ? 0 : 1,
    list: [
      { id: 0, title: "推荐" },
      { id: 1, title: "关注" }
    ]
  },
  loadingStatus: state.snsHome.fetchStatus == ASYNC_STATUS.LOADING,
  showError: state.snsHome.fetchStatus == ASYNC_STATUS.ERROR
});

/**
 * Redux Map Action to Page Function
 * 
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchSNSHomeData: (method, tab, pageNo) => dispatch(fetchSNSHomeData(method, tab, pageNo)),
  addFeedImages: (method) => dispatch(addFeedImages(method)),
  addFeedLocation: (lat, lng, title, address) => dispatch(addFeedLocation(lat, lng, title, address)),
  toggleFollowUser: (userId, subscribe) => dispatch(toggleFollowUser(userId, subscribe)),
  toggleDiggFeed: (feedId, digg) => dispatch(toggleDiggFeed(feedId, digg))
});

/**
 * Page Object
 * 
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
