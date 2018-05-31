//index.js
//获取应用实例

// import { requireAuthUrl } from '../../utils/ucenter';

//购物车辅助操作函数
import { 
  sortBySeller, 
  getProductPos, 
  getCartTotal, 
  toggleCartProduct, 
  toggleCartSeller,
  getAllCheckedProducts
} from '../../utils/cart';

//Redux Action
import { fetchCartContent } from '../../actions/cartAction';
import checkoutAction from '../../actions/checkoutAction';

//Redux connection
import { connect } from '../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../base';

/**
 * Product Page Config Object
 */
const pageConfig = Object.assign({}, base, {
// let pageConfig = {
  /**
   * Data Object
   */
  data: {
    cartContents: null,
    orderTotal: 0
  },

  /**
   * onSellerCheckTap
   * 
   * @param e event object
   */
  onSellerCheckTap: function (e) {
    let sellerId = e.currentTarget.dataset.sellerId;

    let cartContents = toggleCartSeller(this.data.cartContents, sellerId)

    console.log(cartContents)

    this.setData({
      cartContents: cartContents,
      orderTotal: getCartTotal(cartContents)
    });
  },

  /**
   * onProductCheckTap
   * 
   * @param e event object
   */
  onProductCheckTap: function (e) {
    let sellerId = e.currentTarget.dataset.sellerId;
    let productId = e.currentTarget.dataset.productId;

    let cartContents = toggleCartProduct(this.data.cartContents, sellerId, productId)

    console.log(cartContents)

    this.setData({
      cartContents: cartContents,
      orderTotal: getCartTotal(cartContents)
    });
  },

  onMinus: function (e) {
    let sellerId = e.currentTarget.dataset.sellerId;
    let productId = e.currentTarget.dataset.productId;
    let contents = this.data.cartContents;

    let pos = getProductPos(contents, sellerId, productId);
    let product = contents[pos.sellerIdx].products[pos.productIdx];
    let quantity = parseInt(product.quantity);
    let stock = parseInt(product.stock);

    //can add show
    if (quantity > 1) {
      contents[pos.sellerIdx].products[pos.productIdx].quantity = quantity - 1;

      this.setData({
        cartContents: contents,
        orderTotal: getCartTotal(contents)
      });
    }
    //show toast
    else {

    }
  },

  onPlus: function (e) {
    let sellerId = e.currentTarget.dataset.sellerId;
    let productId = e.currentTarget.dataset.productId;
    let contents = this.data.cartContents;

    let pos = getProductPos(contents, sellerId, productId);
    let product = contents[pos.sellerIdx].products[pos.productIdx];
    let quantity = parseInt(product.quantity);
    let stock = parseInt(product.stock);

    //can add show
    if (quantity < stock) {
      contents[pos.sellerIdx].products[pos.productIdx].quantity = quantity + 1;

      this.setData({
        cartContents: contents,
        orderTotal: getCartTotal(contents)
      });
    } 
    //show toast
    else {
      
    }
  },

  onCheckoutTap: function(e) {
    let products = getAllCheckedProducts(this.data.cartContents);

    console.log(products);
    
    this.addToOrder(products);

    requireAuthUrl("/pages/checkout/index");
  },
  /**
   * 页面加载函数
   * 
   * @param options 传入参数对象
   */
  onLoad: function () {
    this.fetchCartContent(this.data.sellers);
  }
});

/**
 * Redux状态映射函数
 * 
 * @param state redux state对象
 */
const mapStateToData = state => ({
  jwt: state.ucenter.jwt,
  userId: state.ucenter.userId,
  nickname: state.ucenter.nickname,
  avatar: state.ucenter.avatar,
  isLogin: state.ucenter.isLogin,
  
  sellers: sortBySeller(state.cart.contents),
  cartContents: state.cart.fetchedCartContents,
  numberOfProducts: state.cart.numberOfProducts,
  cartTotal: state.cart.cartTotal
})

/**
 * Redux action分发映射射函数
 * 
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchCartContent: (contents) => dispatch(fetchCartContent(contents)),
  addToOrder: (products) => dispatch(checkoutAction.addProducts(products))
})

/**
 * Page页面
 * 
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig))
