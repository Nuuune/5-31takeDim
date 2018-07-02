
import util from '../utils/util';

/*HOST*/
const HOST_URL = 'https://api.freshkoo.com/dw/micro-api/';
const NEW_HOST = `https://api.dinlab.cn/micro-api`;
/**
 * wxRequest Method
 *
 * @param params
 * @url url to request
 */
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });

  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json',
      'source': 'weapp'
    },
    success: (res) => {
      params.success && params.success(res.data)
      wx.hideToast()
    },
    fail: (res) => {
      wx.showModal({
        title: '',
        content: JSON.stringify(res),
      });
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

const getHomeData = (params) => wxRequest(params, HOST_URL + 'panda/api/view/home')
const getProductData = (params) => wxRequest(params, HOST_URL + 'panda/api/view/product/' + params.data.productId)
const getEcHomeData = (params) => wxRequest(params, HOST_URL + "/social/api/view/commerce")
const getShoppingCart = (params) => wxRequest(params, HOST_URL + "/panda/api/view/shopcart?products=" + JSON.stringify(params.data.rawData))
const getArticleData = (params) => wxRequest(params, HOST_URL + '/panda/api/view/article/' + params.data.articleId)
const getTrainersData = (params) => wxRequest(params, `${NEW_HOST}/api/trainers`)
const getCourseData = (params) => wxRequest(params, `${NEW_HOST}/api/courses`)
const getCourseDetail = (params) => wxRequest(params, `${NEW_HOST}/api/course/${params.id}`)
const serverWxLogin = (params) => wxRequest(params, `${NEW_HOST}/api/account/login/wxcode`)

const wxNewRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });

  let ucenter = getApp().store.getState().ucenter;
  console.log("ucenter token:" + ucenter.token)

  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json',
      'source': 'WE_APP',
      'memberEncode': ucenter.token
    },
    success: (res) => {
      params.success && params.success(res.data)
      wx.hideToast()
    },
    fail: (res) => {
      wx.showModal({
        title: '',
        content: JSON.stringify(res),
      });
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

  const sendSMS = (params) => wxNewRequest(params, `${NEW_HOST}/api/account/send/code?mobile=${params.data.mobile}`)
  const doSMSLogin = (params) => wxNewRequest(params, `${NEW_HOST}/api/account/login/vcode`)

  const getSNSHome = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/community/hots')
  const getFollowedFeeds = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/community')


  const getFeed = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/feed/' + params.data.feedId)
  const getSNSCatContent = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/feeds')
  const postFeed = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/feed')
  const postComment = (params) => {
    if (params.data.commentId == undefined) {
      wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/comment?feedId=' + params.data.feedId + '&content=' + params.data.content)
    } else {
      wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/comment?feedId=' + params.data.feedId + '&commentId=' + params.data.commentId + '&content=' + params.data.content)
    }
  }
  const getUserInfo = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/user/' + params.data.userId)
  const followUser = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/user/follow?userId=' + params.data.userId)
  const toggleDiggFeed = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/feed/digg?feedId=' + params.data.feedId)

  const getTopicList = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/topics')
  const getTopicData = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/topic/' + params.data.topicId)


  const getUserFollower = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/user/' + params.data.userId + '/followers');

  const getUserFollowed = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/user/' + params.data.userId + '/stars');

  //频道
  const getChannelList = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/channels');
  const getChannelInfo = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/channel/' + params.data.channelId);

  const followChannel = (params) => wxNewRequest(params, 'https://api.dinlab.cn/micro-api/api/channel/follow/?channelId=' + params.data.channelId);

  module.exports = {
    getTrainersData,
    getCourseDetail,
    getCourseData,
    getHomeData,
    getProductData,
    getEcHomeData,
    getShoppingCart,
    getArticleData,
    getSNSHome,
    getFollowedFeeds,
    getSNSCatContent,
    postFeed,
    sendSMS,
    doSMSLogin,
    serverWxLogin,
    getFeed,
    postComment,
    getUserInfo,
    followUser,
    toggleDiggFeed,
    getTopicList,
    getTopicData,

    getChannelList,
    getChannelInfo,

    getUserFollower,
    getUserFollowed,
    followChannel
  }
