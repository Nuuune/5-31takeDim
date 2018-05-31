/**
 * 社区页面配置对象
 */

import base from '../base';


/**
 * 社区页面父类
 */
  module.exports = Object.assign({}, base, {

    /**
     * 动态点击响应函数，点击进入动态详情
     *
     * @param e event
     */
    onFeedTap: function (e) {
      let feedId = e.currentTarget.dataset.feedId;

      wx.navigateTo({
        url: '/pages/sns/feed/info/index?feedId=' + feedId
      });
    },


    /**
     * 当用户头像被点击，点击进入用户首页
     * 
     * @param e event
     */
    onFeedUserTap: function (e) {
      let userId = e.currentTarget.dataset.userId;

      wx.navigateTo({
        url: '/pages/sns/user/info/index?userId=' + userId,
      });
    },


    /**
     * 动态点赞
     * 
     * @param e event
     */
    onToogleFeedDiggTap: function (e) {
      let feedId = e.currentTarget.dataset.feedId;
      let digged = e.currentTarget.dataset.digged;


      this.requireAuth(() => {
        this.toggleDiggFeed(feedId, (digged === true) ? false : true);
      });

      

      // api.diggFeed({
      //   method: 'POST',
      //   data: {
      //     feedId: feedId
      //   },
      //   success: (res) => {
      //     console.log(res)
      //   }
      // })
    },


    /**
     * 点击关注
     */
    onFollowTap: function (e) {
      let followStatus = e.currentTarget.dataset.followStatus;

      this.requireAuth(() => {
        let userId = e.currentTarget.dataset.userId;

        this.toggleFollowUser(userId, (followStatus == 0) ? true : false);
      });
    },
  });