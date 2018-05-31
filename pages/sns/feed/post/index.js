/**
 * 动态发布
 */

import util from '../../../../utils/util';
import upload from '../../../../utils/upload';

//Redux actions
import { postFeedData } from '../../../../actions/feedAction';

//异步加载状态
import { SNS_POST_FEED, LOADING_METHOD, ASYNC_STATUS } from "../../../../action-types";

//reduct connect method, connect state and props
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../../../base';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {
  /**
   * 
   */
  data: {
    title: null,
    content: null,
    formValid: false,
    channelId: 0,

    showAddImageButton: true,
    uploadedImages: [],

    locName: null,
    locLat: null,
    locLng: null,
    locAddress: null
  },

  /**
   * 输入标题
   * 
   * @param e event对象
   */
  onTitleInput: function (e) {
    this.setData({
      title: e.detail.value,
      formValid: !util.isEmpty(e.detail.value) && !util.isEmpty(this.data.content)
    });
  },
  /**
   * 输入内容
   * 
   * @param e event对象
   */
  onContentInput: function (e) {
    this.setData({
      content: e.detail.value,
      formValid: !util.isEmpty(e.detail.value) && !util.isEmpty(this.data.title)
    });
  },

  /**
   * 添加图片
   * 
   * 1. 上传图片至云存储
   * 2. 显示图片缩略图
   * 3. 每上传成功一个，images应该存的是阿里云的图片地址，数字自减，等上传完成，去除toast
   * 4. 如果图片大于等于9张，则隐藏添加按钮
   */
  onAddImageTap: function (e) {
    let scope = this,
        count = 0,
        uploadedCount = util.isEmpty(this.data.uploadedImages) ? 0 : this.data.uploadedImages.length;

    wx.chooseImage({
      count: this.CONF.MAX_FEED_IMAGE_COUNT - uploadedCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let tempFilePaths = res.tempFilePaths;

        //如果用户选中了图片
        if (!util.isEmpty(tempFilePaths)) {
          let count = tempFilePaths.length;

          wx.showToast({
            title: '图片上传中。。。',
            icon: 'loading',
            duration: 10000
          });

          tempFilePaths.forEach(image => {
            upload.aliyunUploadFile(
              image,
              scope.CONF.ALIYUN_FEED_UPLOAD_PATH,
              "",
              //success call back
              //
              file => { 
                //count自减
                count--;

                let uploadedImages = util.isEmpty(scope.data.uploadedImages) ? [] : scope.data.uploadedImages;

                //push data into images
                uploadedImages.push(scope.CONF.ALIYUN_ENDPOINT + file);

                //上传完成则隐藏toast
                if (count == 0) {
                  wx.hideToast();
                }

                scope.setData({
                  uploadedImages: uploadedImages,
                  showAddImageButton: (uploadedImages.length == scope.CONF.MAX_FEED_IMAGE_COUNT) ? false : true
                });
              }, 
              //error call back
              //
              error => {
                console.log(error)
              });
          });
        }
      }
    })
  },

  /**
   * 删除图片
   */
  onDeleteImageTap: function (e) {
    let uploadedImages = this.data.uploadedImages;
    let idx = e.currentTarget.dataset.indexId;

    uploadedImages.splice(idx, 1);

    this.setData({
      uploadedImages,
      showAddImageButton: true
    });
  },

  /**
   * 选择地址
   */
  onChooseLocationTap: function () {
    let scope = this;

    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)

        scope.setData({
          locName: res.name,
          locAddress: res.address,
          locLat: res.latitude,
          locLng: res.longitude
        });
      },
    })
  },

  /**
   * 删除位置
   */
  onRemoveLocationTap: function(e) {
    this.setData({
      locName: null,
      locLat: null,
      locLng: null,
      locAddress: null
    });
  },

  /**
   * 发布动态
   */
  onPostTap: function () {
    let postData = {
      type: 1,
      title: this.data.title,
      content: this.data.content,
      images: this.data.uploadedImages.join(","),
      showLocation: util.isEmpty(this.data.locName) ? 0 : 1,
      location: this.data.locName,
      lat: this.data.locLat,
      lng: this.data.locLng,
      address: this.data.locAddress
    };

    if (!util.isEmpty(this.data.channelId)) {
      postData.channelId = this.data.channelId;
    }

    this.postFeedData(postData);
  },

  /**
   * 获取用户动态发布地址
   */
  getLBSLocation: function() {
    let scope = this;

    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (loc) => {
        wx.request({
          url: scope.CONF.QQ_MAP_WEBSERVICE_URL + "&get_poi=0&location=" + loc.latitude + "," + loc.longitude,
          success: (res) => {
              scope.setData({
                locName: res.data.result.formatted_addresses.recommend,
                locLat: loc.latitude,
                locLng: loc.longitude,
                locAddress: res.data.result.address
              });
          }
        })
      }
    });
  },

  /**
   * 
   */
  onLoad: function (options) {
    if (!util.isEmpty(options.channelId)) {
      this.setData({
        channelId: options.channelId
      });
    }
    
    this.getLBSLocation();
  }
});

/**
 * Redux Map State To Date
 * 
 * @param state object
 */
const mapStateToData = state => ({
  uploadedImages: state.feed.postFeedImages,
  locName: state.feed.title,
  locLat: state.feed.latitude,
  locLng: state.feed.longitude,
  locAddress: state.feed.address
})

/**
 * Redux Map Action to Page Function
 * 
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  postFeedData: (data) => dispatch(postFeedData(data))
})

/**
 * Page Object
 * 
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));