'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var ShopProduct = new Module('shopProduct');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
ShopProduct.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  ShopProduct.routes(app, auth, database);


  ShopProduct.aggregateAsset('css', 'shopProduct.css');


  return ShopProduct;
});
