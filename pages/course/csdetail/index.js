
import constants from "../../../constants";
import {dedata} from "../../../json/course/coursed.js";

import base from "../../base";

//Redux actions
import {fetchCourseDetail} from '../../../actions/courseAction';

//Redux
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

let videoSrc = [
    'http://glico.aosaiban.com/dist/video/video1.mp4',
    'http://glico.aosaiban.com/dist/video/video2.mp4',
    'http://glico.aosaiban.com/dist/video/video3.mp4'
  ];

let pageConfig = Object.assign({}, base, {
  data: {
    istab1: false,
    avater: constants.DEFAULT_AVATAR,
    currVideo: '',
    isplay: false,
    courseDetail: {}
  },
  toggleTab: function(e) {
    this.setData({istab1: !this.data.istab1});
  },
  onLoad: function(e) {
    this.fetchCourseDetail({id: e.id});
    this.setData({currVideo: videoSrc[0]});
    this.videoContext = wx.createVideoContext('myVideo');
  },
  changeVideo: function(e) {
    let vid = e.currentTarget.dataset.vid;
    this.videoContext.pause();
    this.setData({currVideo: videoSrc[vid], isplay:false});
  },
  /* video标签相关事件 */
  videoPlay: function(e) {
    console.log(e);
    console.log(`视频开始播放`);
  },
  videoPause: function(e) {
    console.log(e);
    console.log(`视频已暂停`);
  },
  playVideo: function(e) {
    this.setData({isplay: true}, () => {
      this.videoContext.play();
    })
  },

  toBuy: function(e) {
    if(!this.userIsNew()){
      wx.navigateTo({
        url: `../csbuy/index`
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
