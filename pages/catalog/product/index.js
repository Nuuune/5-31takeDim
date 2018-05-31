
//imports
import api from '../../../api/api';
import util from '../../../utils/util';

import {getProductCartQuantity} from '../../../utils/cart';


//async status
import { ASYNC_STATUS } from "../../../action-types";

//Redux actions
import {fetchProductData} from '../../../actions/productAction';
import cartAction from '../../../actions/cartAction';
import checkoutAction from '../../../actions/checkoutAction';

//Redux
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../../base';

/**
 * Product Page Config Object
 */
const pageConfig = Object.assign({}, base, {
// let pageConfig = {
  /**
   * Data Object
   */
  data: {
    productId: null,
    product: null,
    showDialog: false,
    addQuantity: 1,
    addType: 'cart',
    numberOfProducts: 0
  },
  _handleZanQuantityPlus: function (e) {
    if (this.data.addQuantity < this.data.product.stock) {
      this.setData({
        addQuantity: this.data.addQuantity + 1
      })
    }
  },

  _handleZanQuantityMinus: function (e) {
    if (this.data.addQuantity > 1) {
      this.setData({
        addQuantity: this.data.addQuantity - 1
      })
    }
  },
  /**
   * On Dialog OK
   */
  toogleDialog: function (e) {
    let addType = util.isEmpty(e) ? "cart" : e.currentTarget.dataset.addType;

    this.setData({
      showDialog: !this.data.showDialog,
      addType: addType
    });
  },
  /**
   * On Dialog OK
   */
  onOK: function () {
    //立即购买
    if (this.data.addType == "checkout") {
      let product = this.data.product;

      this.addToOrder([{
        productId: product.productId,
        quantity: this.data.addQuantity,
        sellerId: product.seller.id
      }]);

      this.requireAuthUrl("/pages/checkout/index");
    }
    //加入购物车
    else {
      let product = this.data.product;
      let cartQuantity = getProductCartQuantity(this.data.cartContents, product.productId);
      let capableQuantity = product.stock - cartQuantity;
      let toAddQuantity = 0;

      if (this.data.addQuantity <= capableQuantity) {
        toAddQuantity = this.data.addQuantity;
      } else {
        toAddQuantity = capableQuantity;
      }

      this.addToCart({
        productId: product.productId,
        quantity: toAddQuantity,
        sellerId: product.seller.id
      });
    }

    //收起购物车
    this.toogleDialog();
  },  
  /**
   * 页面加载函数
   * 
   * @param options 传入参数对象
   */
  onLoad: function (options) {
    this.fetchProductData(options.productId);
    // this.fetchProductData(1766);
  }
// };
});

/**
 * Redux状态映射函数
 * 
 * @param state redux state对象
 */
const mapStateToData = state => ({
  //商品数据
  product: state.product.productData,
  //加载状态
  fetchStatus: state.catalogHome.fetchStatus,
  showLoading: state.catalogHome.fetchStatus == ASYNC_STATUS.LOADING,
  showError: state.catalogHome.fetchStatus == ASYNC_STATUS.ERROR,
  //购物车
  cartContents: state.cart.contents,
  numberOfProducts: state.cart.numberOfProducts
});

/**
 * Redux action分发映射射函数
 * 
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchProductData: (productId) => dispatch(fetchProductData(productId)),
  addToCart: (product) => dispatch(cartAction.addProduct(product)),
  addToOrder: (products) => dispatch(checkoutAction.addProducts(products))
});

/**
 * Page页面
 * 
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
