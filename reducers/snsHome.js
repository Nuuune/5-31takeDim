//redux action
import { 
  SNS_FETCH_HOME, 
  SNS_HOME_PREPEND_POSTED_FEED, 
  LOADING_METHOD, ASYNC_STATUS,
  UCENTER_TOGGLE_FOLLOW_USER,
  SNS_TOGGLE_DIGG_FEED
} from '../action-types';

//import page size 
import { SNS_HOME_PAGE_SIZE, SNS_TAB_RECOMMEND, SNS_TAB_FOLLOWED } from '../constants';

//导入世间美化函数
import { isEmpty, prettyTime } from '../utils/util';

/**
 * Initial State
 */
const initialState = {
  method: "load",
  selectedTab: SNS_TAB_RECOMMEND,
  fetchStatus: null,
  feeds: null,
  feedCount: 0,
  pageNo: 0,
  hasMore: true,
  snsCategories: null
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  let feeds = null;

  switch (action.type) {
    //动态点赞
    //
    case SNS_TOGGLE_DIGG_FEED:
      console.log("SNS_TOGGLE_DIGG_FEED")
        
      //修改动态点赞状态
      if (!isEmpty(state.feeds) && (action.status == ASYNC_STATUS.SUCCESS)) {
        feeds = state.feeds.map(item => {
          //修改点赞状态
          if (item.id == action.feedId) {
            item.digged = action.digged;
          }

          //设置点赞数量和用户列表
          if (action.digged === true) {
            item.diggCount += 1;
          } else {
            item.diggCount -= 1;
          }

          return item;
        });

        return {
          ...state,
          feeds
        };
      }

      break;
    
    //关注用户
    //
    case UCENTER_TOGGLE_FOLLOW_USER:
      console.log("UCENTER_TOGGLE_FOLLOW_USER");
      console.log(action);
      
      //修改动态关注状态
      if (!isEmpty(state.feeds) && (action.status == ASYNC_STATUS.SUCCESS)) {
        feeds = state.feeds.map(item => {
          if (item.userId == action.userId) {
            item.user.subscribe = action.subscribe;
          }

          return item;
        });

        return {
          ...state,
          feeds
        };
      }

      break;
    // //获取社交首页
    case SNS_HOME_PREPEND_POSTED_FEED:
      // console.log("在关注列表头部，加入feed");

      feeds = state.feeds;
      feeds.unshift(action.feedData);

      // console.log(feeds)

      return {
        ...state,
        feeds: feeds
      };

      break;

    //获取社交首页
    case SNS_FETCH_HOME:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            method: action.method,
            selectedTab: action.tab,
            pageNo: action.pageNo,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;
        case ASYNC_STATUS.SUCCESS:
          //动态创建日期美化
          let feeds = action.data.feeds.map(item => {
            item.formattedDateCreated = prettyTime(item.dateCreated);

            return item;
          });

          // console.log("reducer");
          // console.log(state);

          //如果是加载或者刷新，则重新赋值动态
          if (state.method == LOADING_METHOD.LOAD || state.method == LOADING_METHOD.REFRESH) {
            feeds = action.data.feeds;
          } 
          //翻页加载更多
          else {
            feeds = state.feeds.concat(action.data.feeds);
          }

          //SNS_TAB_FOLLOWED
          if (state.selectedTab == SNS_TAB_FOLLOWED) {
            return {
              ...state,
              fetchStatus: ASYNC_STATUS.SUCCESS,
              feeds: feeds,
              feedCount: action.data.feedCount,
              hasMore: (SNS_HOME_PAGE_SIZE * (state.pageNo + 1)) < action.data.feedCount,
              banners: null
            };
          } 
          //SNS_TAB_RECOMMEND
          else if(state.selectedTab == SNS_TAB_RECOMMEND) {
            return {
              ...state,
              fetchStatus: ASYNC_STATUS.SUCCESS,
              feeds: feeds,
              feedCount: action.data.feedCount,
              hasMore: (SNS_HOME_PAGE_SIZE * (state.pageNo + 1)) < action.data.feedCount,
              banners: (state.method == LOADING_METHOD.LOAD || state.method == LOADING_METHOD.REFRESH) ? action.data.banners : state.banners
            };
          }


          break;
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.ERROR
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
