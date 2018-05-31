
import util from 'util.js';

//全局变量
var app = getApp()

/**
 * Get Seller Pos
 * 
 * @param cartItems
 * @param sellerId
 * 
 * @return sellerId index 
 */
function findSellerPos(cartItems, sellerId) {
  for (let i = 0; i < cartItems.length; i++) {
    let seller = cartItems[i];

    if (seller.sellerId == sellerId) {
      return i;
    }
  }

  return false;
}

/**
 * Get Product Pos
 *
 * @param cartItems
 * @param sellerId
 * @param productId
 *
 * @return productId index
 */
function findProductPos(cartItems, sellerId, productId) {
  for (let i = 0; i < cartItems.length; i++) {
    let seller = cartItems[i];

    if (seller.sellerId == sellerId) {
      let products = seller.products;

      for (let j = 0; j < products.length; j++) {
        let product = products[j];

        if (product.productId == productId) {
          return j;
        }
      }
    }
  }

  return false;
}

/**
 * add to cart
 * 
 * @param sellerId
 * @param productId
 * @param quantity
 * 
 * @return void
 */
function addToCart(sellerId, productId, quantity) {
  let cartItems = app.globalData.cartContents;

  let sellerExists = false;

  let isEmpty = util.isEmpty(cartItems)
  if (isEmpty) {
    cartItems = [];
  }

  if (util.isEmpty(quantity)) {
    quantity = 1;
  }

  let sellerPos = findSellerPos(cartItems, sellerId);
  let productPos = findProductPos(cartItems, sellerId, productId);

  if (sellerPos !== false) {
    if (productPos !== false) {
      cartItems[sellerPos].products[productPos].quantity =
        parseInt(cartItems[sellerPos].products[productPos].quantity) + parseInt(quantity);
    } else {
      cartItems[sellerPos].products.push({
        productId: productId,
        quantity: parseInt(quantity)
      });
    }
  } else {
    let seller = {};
    seller.sellerId = sellerId;
    seller.products = [];
    seller.products.push({
      productId: productId,
      quantity: quantity
    });

    cartItems.push(seller);
  }

  app.globalData.cartContents = cartItems;

  try {
    wx.setStorageSync('cartContents', app.globalData.cartContents);
  } catch (e) {
  }
}


/**
 * Calculate Cart Total
 */
function getCartTotal(cartItems) {
  let total = 0

  //console.log("Start Get Cart Total")

  for (let sellerId in cartItems) {
    //console.log("Get Cart Total [sellerId]:" +sellerId)

    let products = cartItems[sellerId].products

    for (let index in products) {
      let product = products[index]
      //console.log("Get Cart Total [product]:" +JSON.stringify(product))


      if (product.checked == true) {
        total += parseInt(product.price) * parseInt(product.quantity)
      }
    }
  }

  //console.log("End Get Cart Total")

  return total
}


/**
 * Remove Products
 */
function removeProducts(cartItems, products) {
  let cartContents = cartItems;

  // console.log('removeProducts: cartItems: ' + JSON.stringify(cartItems))
  // console.log('removeProducts: products: ' + JSON.stringify(products))

  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products[i].products.length; j++) {
      cartContents = removeProduct(
        cartContents,
        products[i].sellerId,
        products[i].products[j].productId)
    }
  }

  return cartContents
}

/**
 * Remove Product
 */
function removeProduct(cartItems, sellerId, productId) {
  let products = cartItems;

  //console.log('removeProduct: products: ' + JSON.stringify(products))

  for (let i = 0; i < products.length; i++) {
    if (products[i].sellerId == sellerId) {
      for (let j = 0; j < products[i].products.length; j++) {
        if (products[i].products[j].productId == productId) {
          products[i].products.splice(j, 1);
        }
      }

      if (products[i].products.length == 0) {
        products.splice(i, 1);
      }
    }
  }

  return products
}

/**
 * getRawCartItems
 */
function getRawCartItems(fetchedCartItems) {
  let cartItems = [];

  for (let i = 0; i < fetchedCartItems.length; i++) {
    let seller = {};
    seller.sellerId = fetchedCartItems[i].sellerId;
    seller.products = [];

    for (let j = 0; j < fetchedCartItems[i].products.length; j++) {
      let product = fetchedCartItems[i].products[j];

      seller.products.push({
        productId: product.productId,
        quantity: parseInt(product.quantity)
      });
    }

    cartItems.push(seller);
  }

  return cartItems;
}


/**
 * Modify Quantity
 */
function toggleSellerCheck(old_products, sellerId) {
  let products = old_products
  let quantity = 0
  let checked = true

  for (let i = 0; i < products.length; i++) {
    //seller found
    if (products[i].sellerId == sellerId) {
      //toggle seller check
      if (products[i].checked == true) {
        checked = false
      }

      products[i].checked = checked

      //update products check status
      for (let j = 0; j < products[i].products.length; j++) {
        products[i].products[j].checked = checked
      }
    }
  }

  return products
}

/**
 * Modify Quantity
 */

function toggleProductCheck(old_products, sellerId, productId) {
  let products = old_products
  let quantity = 0
  let checkedCount = 0
  let uncheckedCount = 0
  let checked = true

  for (let i = 0; i < products.length; i++) {
    if (products[i].sellerId == sellerId) {
      for (let j = 0; j < products[i].products.length; j++) {
        if (products[i].products[j].productId == productId) {
          //toggle product check
          if (products[i].products[j].checked == true) {
            checked = false
          } else {
            checked = true
          }

          products[i].products[j].checked = checked
        }

        //
        if (products[i].products[j].checked == true) {
          checkedCount++
        } else {
          uncheckedCount++
        }
      }

      if (checkedCount == products[i].products.length) {
        products[i].checked = true
      }

      //uncheck的话，是如果全部都灭了，则必须灭
      if (uncheckedCount == products[i].products.length) {
        products[i].checked = false
      }
    }
  }

  return products
}


module.exports = {
  addToCart: addToCart,
  getCartTotal: getCartTotal,
  toggleSellerCheck: toggleSellerCheck,
  toggleProductCheck: toggleProductCheck
}