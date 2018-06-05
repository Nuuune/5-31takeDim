/**
 * Copyright (C), 2017 InnoSolutions
 *
 * File Name: /pages/ucenter/index2/index
 *
 * Author: InnoSolutions Team
 * Description: 用户中心首页
 */

//import util
import util from '../../../utils/util.js';

//redux connect
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';


/**
 * 页面配置对象
 */
const pageConfig ={};

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
});

/**
 * Map Redux Action to Page
 */
const mapDispatchToPage = dispatch => ({
});

/**
 * Map Dispatch to Page
 */
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);

/**
 * Page
 */
Page(nextPageConfig);
