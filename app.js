import reducers from 'reducers/index';
import { createStore, applyMiddleware, compose } from 'libs/redux/redux.min';
import { Provider, connect } from 'libs/redux-weapp/wechat-weapp-redux.min';

import thunkMiddleware from 'libs/redux-thunk/redux-thunk';

// create store...
const middleware = [thunkMiddleware];   // 允许我们 dispatch() 函数
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

import {initUserInfo} from 'actions/ucenterAction'

/**
 * Main App
 */
App(Provider(store)({
  onLaunch: function () {
    initUserInfo(store)
  }
}))
