/**
 * Copyright (C), 2017 InnoSolutions
 *
 * File Name: action-type.js
 *
 * Author: InnoSolutions Team
 *
 * Description: Constants Definition for Redux Action Type
 */


const LOADING_METHOD = {
  LOAD: 'LOAD',
  REFRESH: 'REFRESH',
  LOADMORE: 'LOADMORE'
}

const ASYNC_STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

//
const CATALOG_FETCH_HOME = "CATALOG_FETCH_HOME"
const CATALOG_FETCH_PRODUCT = "CATALOG_FETCH_PRODUCT"

//
const SNS_FETCH_HOME = "SNS_FETCH_HOME"
const SNS_FETCH_FOLLOWED_FEEDS = "SNS_FETCH_FOLLOWED_FEEDS"
const SNS_FETCH_FEEDS = "SNS_FETCH_FEEDS"
const SNS_FETCH_FEED = "SNS_FETCH_FEED"
const SNS_POST_FEED_COMMENT = "SNS_POST_FEED_COMMENT"

//
const SNS_ADD_FEED_IMAGES = "SNS_ADD_FEED_IMAGES"

//
const SNS_TOGGLE_DIGG_FEED = "SNS_TOGGLE_DIGG_FEED"
const SNS_POST_FEED = "SNS_POST_FEED"
const SNS_HOME_PREPEND_POSTED_FEED = "SNS_HOME_PREPEND_POSTED_FEED"

//
const SNS_FETCH_TOPIC_LIST = "SNS_FETCH_TOPIC_LIST"
const SNS_FETCH_TOPIC = "SNS_FETCH_TOPIC"

const SNS_FETCH_CHANNEL_LIST = "SNS_FETCH_CHANNEL_LIST"
const SNS_FETCH_CHANNEL_INFO = "SNS_FETCH_CHANNEL_INFO"
const SNS_CHANNEL_INFO_PREPEND_POSTED_FEED = "SNS_CHANNEL_INFO_PREPEND_POSTED_FEED"

const SNS_FETCH_USER_INFO = "SNS_FETCH_USER_INFO"

//cart
const CART_LOAD_STORAGE = "CART_LOAD_STORAGE"
const CART_ADD_PRODUCT = "CART_ADD_PRODUCT"
const CART_REMOVE_PRODUCTS = "CART_REMOVE_PRODUCTS"
const CART_FETCH_CONTENTS = "CART_FETCH_CONTENTS"
// const CART_CHANGE_QUANTITY = "FETCH_SHOPPING_CART"
// const CART_ON_SELLER_CHECK_CLICK = "FETCH_SHOPPING_CART"
// const SHOPPINGCART_ON_PRODUCT_CHECK_CLICK = "FETCH_SHOPPING_CART"


//checkout
const CHECKOUT_ADD_PRODUCTS = "CHECKOUT_ADD_PRODUCTS"
const CHECKOUT_FETCH_CONTENTS = "CHECKOUT_FETCH_CONTENTS"

//ucenter
const FETCH_LOGIN = "FETCH_LOGIN"
const INIT_SESSION = "INIT_SESSION"
const WX_CHECKSESSION_SUCCESS = "WX_CHECKSESSION_SUCCESS"
const WX_LOGIN_SUCCESS = "WX_LOGIN_SUCCESS"
const SUBSCRIBE_LOGIN_CALLBACK = "SUBSCRIBE_LOGIN_CALLBACK"
const SUBSCRIBE_LOGIN_NEXT_URL = "SUBSCRIBE_LOGIN_NEXT_URL"
const SUBSCRIBE_JWT_CALLBACK = "SUBSCRIBE_JWT_CALLBACK"
const UCENTER_TOGGLE_FOLLOW_USER = "UCENTER_TOGGLE_FOLLOW_USER"

//course
const COURSE_FETCH_LIST = "COURSE_FETCH_LIST"
const COURSE_CLEAR_ERRMSG = "COURSE_CLEAR_ERRMSG"
const COURSE_CLEAR_LIST = "COURSE_CLEAR_LIST"
const COURSE_CLEAR_COURSEDETAIL = "COURSE_CLEAR_COURSEDETAIL"
const COURSE_SET_COURSEDETAIL = "COURSE_SET_COURSEDETAIL"

module.exports = {
  ASYNC_STATUS,
  LOADING_METHOD,

  // course
  COURSE_SET_COURSEDETAIL,
  COURSE_CLEAR_LIST,
  COURSE_FETCH_LIST,
  COURSE_CLEAR_ERRMSG,
  COURSE_CLEAR_COURSEDETAIL,
  //catalog
  CATALOG_FETCH_HOME,
  CATALOG_FETCH_PRODUCT,

  //catalog
  SNS_FETCH_HOME,
  SNS_FETCH_FOLLOWED_FEEDS,
  SNS_FETCH_FEEDS,
  SNS_FETCH_FEED,
  SNS_TOGGLE_DIGG_FEED,
  SNS_POST_FEED,
  SNS_HOME_PREPEND_POSTED_FEED,
  SNS_POST_FEED_COMMENT,

  SNS_FETCH_TOPIC_LIST,
  SNS_FETCH_TOPIC,


  SNS_FETCH_CHANNEL_LIST,
  SNS_FETCH_CHANNEL_INFO,
  SNS_CHANNEL_INFO_PREPEND_POSTED_FEED,

  SNS_FETCH_USER_INFO,

  SNS_ADD_FEED_IMAGES,

  //shopping cart
  CART_LOAD_STORAGE,
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCTS,
  CART_FETCH_CONTENTS,

  //checkout
  CHECKOUT_ADD_PRODUCTS,
  CHECKOUT_FETCH_CONTENTS,

  //ucenter
  FETCH_LOGIN,
  INIT_SESSION,
  WX_CHECKSESSION_SUCCESS,
  WX_LOGIN_SUCCESS,
  SUBSCRIBE_LOGIN_CALLBACK,
  SUBSCRIBE_LOGIN_NEXT_URL,
  SUBSCRIBE_JWT_CALLBACK,
  UCENTER_TOGGLE_FOLLOW_USER
}
