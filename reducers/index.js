import { combineReducers } from '../libs/redux/redux.min.js'


import cart from './cart';
import checkout from './checkout';
import login from './login';
import product from './product';
import ucenter from './ucenter';
import catalogHome from './catalogHome';
import snsHome from './snsHome';
import feed from './feed';
import snsTopic from './snsTopic';
import snsChannel from './snsChannel';
import snsUser from './snsUser';

export default combineReducers({
  product,
  cart,
  checkout,
  login,
  ucenter,
  catalogHome,
  snsHome,
  feed,
  snsTopic,
  snsChannel,
  snsUser
});