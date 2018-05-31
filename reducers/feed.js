import { 
  SNS_POST_FEED, 
  SNS_FETCH_FEED, 
  SNS_POST_FEED_COMMENT, 
  SNS_ADD_FEED_IMAGES, 
  ASYNC_STATUS,
  SNS_TOGGLE_DIGG_FEED,
  UCENTER_TOGGLE_FOLLOW_USER
} from '../action-types';

//导入世间美化函数
import { isEmpty, prettyTime } from '../utils/util';

const initialState = {
  actionType: null,
  feedData: null,
  reCommentId: null,
  commentContent: null,
  postFeedImages: null
}

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  let feedData = state.feedData;

  switch (action.type) {
    //关注用户
    //
    case UCENTER_TOGGLE_FOLLOW_USER:
      if (!isEmpty(feedData) && (action.status == ASYNC_STATUS.SUCCESS)) {
        feedData.user.subscribe = action.subscribe;

        return {
          ...state,
          feedData
        };
      }

      break;
    //动态点赞
    //
    case SNS_TOGGLE_DIGG_FEED:

      //当前动态是否需要更新状态
      if (
        !isEmpty(feedData) && 
        (feedData.id == action.feedId) && 
        (feedData.digged != action.digged) && 
        (action.status == ASYNC_STATUS.SUCCESS)) {

        //获取用户对象        
        let ucenter = getApp().store.getState().ucenter;

        //设置动态点赞状态
        feedData.digged = action.digged;

        //设置点赞数量和用户列表
        if (action.digged === true) {
          feedData.diggCount += 1;
          
          if (isEmpty(feedData.diggUsers)) {
            feedData.diggUsers = [];
          }

          feedData.diggUsers.push({
            avatar: ucenter.avatar,
            id: ucenter.userId,
            nickname: ucenter.nickname
          });
        } else {
          feedData.diggCount -= 1;

          let userIdx = 0;
          feedData.diggUsers.forEach((user, index) => {
            if (user.id == ucenter.userId) {
              userIdx = index;
            }
          });

          feedData.diggUsers.splice(userIdx, 1);
        }

        return {
          ...state,
          feedData
        };
      }

      break;
    //动态发布
    //
    case SNS_POST_FEED:
      switch (action.status) {
        
        //获取动态中。。。
        //
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            ACTION_TYPE: SNS_POST_FEED,
            POST_STATUS: ASYNC_STATUS.LOADING
          };
          break;

        //动态发布成功
        //
        case ASYNC_STATUS.SUCCESS:
          wx.navigateBack();

          return {
            ...state,
            POST_STATUS: ASYNC_STATUS.SUCCESS
          };
          break;

        //获取动态失败
        //
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            POST_STATUS: ASYNC_STATUS.ERROR
          };
          break;
        default:
          return state;
          break;
      }
      break;
    //动态详情
    //
    case SNS_FETCH_FEED:
      switch (action.status) {
        //获取动态成功
        //
        case ASYNC_STATUS.SUCCESS:
          //格式化feed和comment日期
          let feed = action.data;
          feed.prettyDateCreated = prettyTime(feed.dateCreated);

          //格式化动态评论日期
          if (!isEmpty(feed.comments)) {
            let comments = feed.comments.map(comment => {
              comment.comment.prettyDateCreated = prettyTime(comment.comment.dateCreated);

              return comment;
            });

            feed.comments = comments;
          }
          
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.SUCCESS,
            feedData: feed
          };
          break;
        //获取动态中。。。
        //
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.LOADING
          };
          break;
        //获取动态失败
        //
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.ERROR
          };
          break;
        default:
          return state;
          break;
      }
      break;
    //添加动态图片
    //
    case SNS_ADD_FEED_IMAGES: 
      return {
        ...state,
        postFeedImages: action.images
      };
      break;
    //添加评论
    //
    case SNS_POST_FEED_COMMENT:
      switch (action.status) {
        //添加评论中。。。
        //
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.LOADING,
            reCommentId: action.reCommentId,
            commentContent: action.commentContent
          };
          break;
        //添加评论成功
        //
        case ASYNC_STATUS.SUCCESS:
          let comment = {};
          let ucenter = getApp().store.getState().ucenter;
          let dateCreated = new Date().getTime();

          //构建评论对象
          comment.comment = {
            id: action.data,
            userId: ucenter.userId,
            content: state.commentContent,
            dateCreated: dateCreated,
            prettyDateCreated: prettyTime(dateCreated),
            user: {
              avatar: ucenter.avatar,
              id: ucenter.userId,
              nickname: ucenter.nickname
            }
          }

          //如果是回复评论则构建回复评论对象
          comment.toComment = null;
          if (!isEmpty(state.reCommentId)) {
            state.feedData.comments.forEach(item => {
              if (state.reCommentId == item.comment.id) {
                comment.toComment = item.comment; 
              }
            });
          }

          //添加评论对象至动态对象
          let feedData = state.feedData;
          if (!isEmpty(state.feedData.comments)) {
            feedData.comments.unshift(comment);
          } else {
            feedData.comments = [comment];
          }
          
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.SUCCESS,
            feedData: feedData,
            reCommentId: null,
            commentContent: null
          };
          break;
        //添加评论失败
        //
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            FETCH_STATUS: ASYNC_STATUS.ERROR
          };
          break;
        default:
          return state;
          break;
      }
      break;
    default:
      return state;
      break;
  }

  return state;
}
