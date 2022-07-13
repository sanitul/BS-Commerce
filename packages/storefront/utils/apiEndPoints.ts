export const apiEndPoints = {
  getUser: `/todos`,
  getSignedInUser: `/customer/auth`,
  getPublicProducts: '/customer/products',
  register: '/customer/auth/register',
  login: '/customer/auth/sign-in',
  getCart: `/cart`,
  deleteCartItem: `/cart/item`,
  deleteAllCartItem: '/cart/allitems',
  updateCartItem: `/cart/item`,
  order: `/customer/order`,
  addToWishList: `/wishlist`,
  getCustomerWishlist: `/wishlist`,
  deleteWishlistItem: `wishlist/items`,
  deleteFullWishlist: `/wishlist/allitems`,
  addToCompare: `/compare`,
  deleteFromCompare: `/compare/item`
};
