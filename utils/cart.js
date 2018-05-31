
import util from 'util.js';


/**
 * 把购物车里的商品按照卖家进行排序
 *
 * @param contents 购物车内容
 * @return 对象
 */
const sortBySeller = (contents) => {
  let sellers = {};

  //
  contents.forEach(
    product => {
      if (util.isEmpty(sellers[product.sellerId])) {
        sellers[product.sellerId] = {};
      }
      if (util.isEmpty(sellers[product.sellerId][product.productId])) {
        sellers[product.sellerId][product.productId] = {};
      }

      sellers[product.sellerId][product.productId] = product.quantity
    }
  );

  return sellers
};

/**
 * 获取商品位置
 *
 * @param contents 购物车内容
 * @param sellerId 卖家id
 * @param productId 商品id
 * @return 对象
 */
const getProductPos = (contents, sellerId, productId) => {
  let sellerIndex = -1;
  let productIndex = -1;

  //iterate cart contents
  contents.forEach((seller, sIdx) => {
    //sellerId found
    if (seller.sellerId == sellerId) {
      //iterate products
      seller.products.forEach((product, pIdx) => {
        //product found
        if (product.productId == productId) {
          sellerIndex = sIdx;
          productIndex = pIdx;
        }
      });
    }
  });

  if (sellerIndex > -1 && productIndex > -1) {
    return {
      sellerIdx: sellerIndex,
      productIdx: productIndex
    }
  }

  return false;
}

/**
 * 获取商品在购物车中的数量
 *
 * @param contents 购物车内容
 * @param productId 商品id
 * @return 商品数量
 */
const getProductCartQuantity = (contents, productId) => {
  let quantity = 0;

  //
  contents.forEach(
    product => {
      if (product.productId == productId) {
        quantity = product.quantity;
      }
    }
  );

  return quantity;
}

/**
 * 计算购物车总值
 * 
 * @param 购物车内容
 * @return 购物车总值
 */
const getCartTotal = (cartContents) => {
  let total = 0;

  cartContents.forEach(seller => {
    let products = seller.products;

    products.forEach(product => {
      if (product.checked == true) {
        total += parseInt(product.price) * parseInt(product.quantity);
      }
    });
  });

  return total;
}


/**
 * 切换购物车中
 * 
 * @param cartContents
 * @param sellerId
 * @param productId
 */
const toggleCartProduct = (cartContents, sellerId, productId) => {
  let contents = cartContents

  //iterate cart contents
  cartContents.forEach((seller, sIdx) => {
    //sellerId found
    if (seller.sellerId == sellerId) {
      //iterate products
      seller.products.forEach((product, pIdx) => {
        //product found
        if (product.productId == productId) {
          contents[sIdx].products[pIdx].checked = product.checked ? false : true;
        }
      });

      //update seller check status
      let checked = contents[sIdx].products.filter(product => {
        return (product.checked == true)
      });

      if (checked.length == 0) {
        contents[sIdx].checked = false;
      } else if (checked.length == contents[sIdx].length) {
        contents[sIdx].checked = true;
      }
    }
  });

  return contents
}


/**
 * Toggle Cart Seller
 * 
 * @param cartContents
 * @param sellerId
 */
function toggleCartSeller(cartContents, sellerId) {
  let contents = cartContents;
  let checked = true;

  cartContents.forEach((seller, sIdx) => {
    //seller found
    if (seller.sellerId == sellerId) {
      contents[sIdx].checked = checked = seller.checked ? false : true;

      //update products check status
      seller.products.forEach((product, pIdx) => {
        contents[sIdx].products[pIdx].checked = checked;
      });
    }
  });

  return contents;
}


/**
 * 切换购物车中
 * 
 * @param cartContents
 * @param sellerId
 * @param productId
 */
const getAllCheckedProducts = (cartContents) => {
  let contents = cartContents
  let products = []

  //遍历卖家
  cartContents.forEach((seller) => {
    //遍历卖家商品
    seller.products.forEach((product) => {
      if (product.checked == true) {
        products.push({
          productId: product.productId,
          quantity: product.quantity,
          sellerId: seller.sellerId
        });
      }
    });
  });

  return products
}


/**
 * 计算购物车总值
 * 
 * @param 购物车内容
 * @return 购物车总值
 */
const getOrderTotal = (orderContents) => {
  let total = 0;

  orderContents.forEach(seller => {
    let products = seller.products;

    products.forEach(product => {
      total += parseInt(product.price) * parseInt(product.quantity);
    });
  });

  return total;
}


module.exports = {
  sortBySeller,
  getProductPos,
  getCartTotal,
  getProductCartQuantity,
  toggleCartProduct,
  toggleCartSeller,
  getAllCheckedProducts,
  getOrderTotal
}