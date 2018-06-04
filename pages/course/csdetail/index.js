
import constants from "../../../constants";

let videoSrc = [
    'http://glico.aosaiban.com/dist/video/video1.mp4',
    'http://glico.aosaiban.com/dist/video/video2.mp4',
    'http://glico.aosaiban.com/dist/video/video3.mp4'
  ];

let pageConfig = {
  data: {
    istab1: false,
    avater: constants.DEFAULT_AVATAR,
    currVideo: ''
  },
  toggleTab: function(e) {
    this.setData({istab1: !this.data.istab1});
  },
  onLoad: function() {
    this.setData({currVideo: videoSrc[0]});
  },
  changeVideo: function(e) {
    let vid = e.currentTarget.dataset.vid;
    this.setData({currVideo: videoSrc[vid]});
  }

};

Page(pageConfig);
