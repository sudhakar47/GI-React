/**
 * Filter Wishlist Data.
 * @return Wishlist Item Count
 */
module.exports.itemcount = function getItemCount(wishlistData) {
  const wishlistJson = {
    wishlistTotalItems: 0,
  };
  if (wishlistData.GiftList && wishlistData.GiftList.length > 0) {
    wishlistData.GiftList.forEach(list => {
      if (list.item && list.item.length > 0) {
        wishlistJson.wishlistTotalItems += list.item.length;
      }
    });
  }
  return wishlistJson;
};
