
import constants from "../../../constants";
import {dedata} from "../../../json/course/coursed.js";

import base from "../../base";

//Redux actions
import {fetchCourseDetail} from '../../../actions/courseAction';

//Redux
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

let videoSrc = [
    'https://zbird-1251886366.cos.ap-shanghai.myqcloud.com/welcome.mp4',
    'https://zbird-1251886366.cos.ap-shanghai.myqcloud.com/welcome.mp4',
    'https://zbird-1251886366.cos.ap-shanghai.myqcloud.com/welcome.mp4'
  ];

let pageConfig = Object.assign({}, base, {
  data: {
    istab1: true,
    currVideo: '',
    isplay: false,
    isNewV: true,
    courseDetail: {},
    isFullScreen: false,
    canIuse: wx.canIUse('video.show-play-btn')
  },
  toggleTab: function(e) {
    this.setData({istab1: !this.data.istab1});
  },
  onLoad: function(e) {
    this.fetchCourseDetail({
      id: e.id,
      success: () => {
        this.setData({currVideo: this.data.courseDetail.videoUrl});
      }
    });
    this.videoContext = wx.createVideoContext('myVideo');
  },
  changeVideo: function(e) {
    let vid = e.currentTarget.dataset.vid;
    this.videoContext.pause();
    this.setData({currVideo: videoSrc[vid], isNewV: true});
  },
  /* video标签相关事件 */
  videoPlay: function(e) {
    console.log(e);
    this.setData({isplay: true});
    console.log(`视频开始播放`);
  },
  videoPause: function(e) {
    console.log(e);
    this.setData({isplay: false});
    console.log(`视频已暂停`);
  },
  playVideo: function(e) {
    this.setData({isplay: true}, () => {
      this.videoContext.play();
    })
  },
  playNewV: function(e) {
    this.setData({isplay: true, isNewV: false}, () => {
      this.videoContext.play();
    })
  },
  videoTap: function(e) {
    let isplay = this.data.isplay;
    if(isplay) {
      this.videoContext.pause();
    }
  },
  videoFullscreenchange: function(e) {
    this.setData({isFullScreen: e.detail.fullScreen});
  },
  toBuy: function(e) {
    let courseId = this.data.courseDetail.id;
    if(!this.userIsNew()){
      wx.navigateTo({
        url: `../csbuy/index?id=${courseId}`
      })
    }
  }

});

/**
 * Redux状态映射函数
 *
 * @param state redux state对象
 */
const mapStateToData = state => ({
  //课程数据
  courseDetail: state.course.courseDetail,
  //加载状态
  isFetching: state.course.isFetching,
  errorMsg: state.course.errorMsg
});


/**
 * Redux action分发映射射函数
 *
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchCourseDetail: (option) => dispatch(fetchCourseDetail(option))
});

Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
