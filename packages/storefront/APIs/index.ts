import {
  checkoutRest,
  addToWishlistRest,
  deleteFullWishlistRest,
  deleteWishlistItemRest,
  addToCompareRest,
  deleteFromCompareRest,
  getCustomerWishlistRest,
  getFeaturedProductsRest,
  getOrderProductsRest,
  getPublicProductByIdRest,
  getPublicProductByCategoryIDRest,
  getPublicProductsRest,
  getSignedInUserRest,
  signinRest,
  signUpRest,
  getCategoryListRest,
  getOrderProductRest,
  getCustomerProfileRest,
  deleteCustomerAddressRest,
  updateCustomerAddressRest,
  addCustomerNewAddressRest,
  getCustomerRest,
  updateCustomerRest,
  getCartRest,
  addToCartRest,
  deleteAllCartItemRest,
  deleteSingleCartItemRest,
  updateCartItemRest,
  sendOTPRest,
  forgetPasswordSendOtpRest,
  forgetPasswordVerifyOtpRest,
  resetPasswordRest,
  getBrandsRest,
  getPublicProductByUniqueNameRest,
  getCategoryDetailsByIdRest,
  getCategoryDetailsBySlugRest,
} from './restApi';

import {
  addToWishlistGraphql,
  deleteFullWishlistGraphql,
  deleteWishlistItemGraphql,
  addToCompareGraphql,
  deleteFromCompareGraphql,
  getCustomerWishlistGraphql,
  getFeaturedProductsGraphql,
  getPublicProductByIdGraphql,
  getPublicProductsGraphql,
  getSignedInUserGraphql,
  getPublicProductByCategoryIDGraphql,
  signInGraphql,
  signUpGraphql,
  getCategoryListGraphql,
  getCustomerProfileGraphql,
  deleteCustomerAddressGraphql,
  updateCustomerAddressGraphql,
  addCustomerNewAddressGraphql,
  checkoutGraphql,
  getCustomerGraphql,
  updateCustomerGraphql,
  getOrderProductsGraphql,
  getOrderProductGraphql,
  getCartGraphql,
  addToCartGraphql,
  deleteAllCartItemGraphql,
  deleteSingleCartItemGraphql,
  updateCartItemGraphql,
  forgetPasswordSendOtpGraphql,
  forgetPasswordVerifyOtpGraphql,
  resetPasswordGraphql,
  sendOTPGraphql,
  getBrandsGraphql,
  getPublicProductByUniqueNameGraphql,
  getCategoryDetailsByIdGraphql,
  getCategoryDetailsBySlugGraphql,
} from './graphQL';
import { config } from 'config';
import { apiFunction } from 'utils/types';

const graphqlApi: apiFunction = {
  signIn: signInGraphql,
  sendOTP: sendOTPGraphql,
  signUp: signUpGraphql,
  getSignedInUser: getSignedInUserGraphql,
  getPublicProducts: getPublicProductsGraphql,
  getPublicProductsById: getPublicProductByIdGraphql,
  getPublicProductByCategoryId: getPublicProductByCategoryIDGraphql,
  getFeaturedProducts: getFeaturedProductsGraphql,
  getCategoryList: getCategoryListGraphql,
  checkout: checkoutGraphql,
  getOrderProducts: getOrderProductsGraphql,
  getOrderProduct: getOrderProductGraphql,
  addToWishList: addToWishlistGraphql,
  getCustomerWishlist: getCustomerWishlistGraphql,
  deleteWishlistItem: deleteWishlistItemGraphql,
  deleteFullWishlist: deleteFullWishlistGraphql,
  addToCompare: addToCompareGraphql,
  deleteFromCompare: deleteFromCompareGraphql,
  getCustomerProfile: getCustomerProfileGraphql,
  deleteCustomerAddress: deleteCustomerAddressGraphql,
  updateCustomerAddress: updateCustomerAddressGraphql,
  addCustomerNewAddress: addCustomerNewAddressGraphql,
  getCustomer: getCustomerGraphql,
  updateCustomer: updateCustomerGraphql,
  getCart: getCartGraphql,
  addToCart: addToCartGraphql,
  deleteAllCartItem: deleteAllCartItemGraphql,
  deleteSingleCartItem: deleteSingleCartItemGraphql,
  updateCartItem: updateCartItemGraphql,
  forgetPasswordSendOtp: forgetPasswordSendOtpGraphql,
  forgetPasswordVerifyOtp: forgetPasswordVerifyOtpGraphql,
  resetPassword: resetPasswordGraphql,
  getBrands: getBrandsGraphql,
  getPublicProductByUniqueName: getPublicProductByUniqueNameGraphql,
  getCategoryDetailsById: getCategoryDetailsByIdGraphql,
  getCategoryDetailsBySlug: getCategoryDetailsBySlugGraphql,
};

const restApi: apiFunction = {
  signUp: signUpRest,
  sendOTP: sendOTPRest,
  signIn: signinRest,
  getSignedInUser: getSignedInUserRest,
  getPublicProducts: getPublicProductsRest,
  getPublicProductsById: getPublicProductByIdRest,
  getPublicProductByCategoryId: getPublicProductByCategoryIDRest,
  getFeaturedProducts: getFeaturedProductsRest,
  getCategoryList: getCategoryListRest,
  checkout: checkoutRest,
  getOrderProducts: getOrderProductsRest,
  getOrderProduct: getOrderProductRest,
  addToWishList: addToWishlistRest,
  getCustomerWishlist: getCustomerWishlistRest,
  deleteWishlistItem: deleteWishlistItemRest,
  deleteFullWishlist: deleteFullWishlistRest,
  addToCompare: addToCompareRest,
  deleteFromCompare: deleteFromCompareRest,
  getCustomerProfile: getCustomerProfileRest,
  deleteCustomerAddress: deleteCustomerAddressRest,
  updateCustomerAddress: updateCustomerAddressRest,
  addCustomerNewAddress: addCustomerNewAddressRest,
  getCustomer: getCustomerRest,
  updateCustomer: updateCustomerRest,
  getCart: getCartRest,
  addToCart: addToCartRest,
  deleteAllCartItem: deleteAllCartItemRest,
  deleteSingleCartItem: deleteSingleCartItemRest,
  updateCartItem: updateCartItemRest,
  forgetPasswordSendOtp: forgetPasswordSendOtpRest,
  forgetPasswordVerifyOtp: forgetPasswordVerifyOtpRest,
  resetPassword: resetPasswordRest,
  getBrands: getBrandsRest,
  getCategoryDetailsById: getCategoryDetailsByIdRest,
  getCategoryDetailsBySlug: getCategoryDetailsBySlugRest,
  getPublicProductByUniqueName: getPublicProductByUniqueNameRest,
};

export const userAPI: apiFunction =
  config?.apiService === 'GRAPHQL' ? graphqlApi : restApi;
