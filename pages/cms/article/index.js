 
//imports
import api from '../../../api/api.js';
import util from '../../../utils/util.js';

/**
 * Page
 */
Page({
  data: {
    articleId: false,
    article: false
  },
  onLoad: function (options) {
    api.getArticleData({
      data: {
        articleId: options.articleId //703, // 
      },
      success: (res) => {
        let article = res.data;

        //set wexin navigation bar title
        wx.setNavigationBarTitle({
          title: article.title
        })

        //format date
        article.fomattedCreateTime = util.formatDate(article.createTime)

        //set data
        this.setData({
          articleId: options.articleId,
          article: article
        })
      }
    })
  }
})
