// * 1
export const getFlashDeals = `flash-deals?platform=web`;
export const getFlashDealProducts = `flash_deal`;
// * 2
export const getBrandStore = `brands`;
export const getAllCategories = `categories`;
// * 3
export const getHomeCategory = `categories/home?platform=web`;
// * 4
export const getHomeCatVisibleProduct = `products/category/`;
// * 5
export const getHomeSliders = `all-sliders`;
export const getHomeSliderProduct = `home-slider-product`;
export const getCategoriesByDepartment = `getcategoriesbydepartment/`;
export const getCategoriesById = `categories?parent_id=`;
export const getCategory = `category-data/`;

// * 6
export const getJobs = `jobs/all`;
export const postJobs = `jobs/job_application`;
// * 7
export const getCategories = `categories`;
// * 8
export const getDepartments = `departments/all`;

export const getMenu = `menu/all`;

export const getShopsBrand = `shops`;
// * 9
export const getShopCategory = `categories/featured`;

export const getShopByCategory = `categories/shopBy`;
// * 9
export const getNewArrival = `products/new-arrivals`;
// * 10
export const getAllImported = `products/imported`;
// * 11
export const getAllImportedFromUSA = `products/imported/USE`;
// * 12
export const getAllPopularProducts = `products/featured`;
// * 13
export const getPantry = `categories/pantry`;
// * 14
export const getFeatureDepartment = `departments/featured`;

// *15
export const postSignUp = `auth/signup`;
// *16
export const postLogin = `auth/login`;
//*17
export const verifyOtp = `auth/confirm_code`;
//*recipe
export const getRecipe = `recipe`;
export const getRecipeById = `recipe/`;
export const getRecipeCategory = `recipe/category/all`;
export const getRecipeByCategory = `recipe-category/`;

//*18
export const forgotPassword = `auth/password/forget_request`;
//*19
export const resendPassword = `auth/resend_code`;
//*20
export const passwordReset = `auth/password/confirm_reset`;
//*21
export const getVariantInfo = `products/variant-price`;
//*22
export const getAllProduct = `products/`;
export const productMultiArray = `products?product_ids=`;
export const productMultiArrayNew = `products-or-package?product_ids=`;
export const productMultiArrayNewCart = `products-or-package?cart_ids=`;
//*23
export const postWishItem = `wishlists-add-product?`;
//*24
export const postRemoveWishItem = `wishlists`;
//*25
export const removeWishItem = `wishlists-remove-product?`;
//*26
export const monthlyBazar = `monthly-bazar`;
//*27
export const getCakes = `bekary/cake`;
export const getSweets = `bekary/sweets`;
export const getBreads = `bekary/breads`;
export const getCookies = `bekary/cookies`;
export const getOthers = `bekary/others`;
//*28
export const postReview = `reviews/submit`;
export const postVoteReview = `reviews/vote/`;
export const getReviewsByProduct = `reviews/product/`;
//*29
export const getQusetjionByProduct = `queries/product/`;
export const postProductQuery = `product-query-store`;
export const postProductQueryReply = `product-query-reply`;
export const postProductQueryReplyVote = `product-query-reply-vote`;

export const postReqStock = `stock-request`;
//*30
export const getMembershipType = `membership-type`;
export const getMembershipTypeSingle = `membership-type-single/`;

export const postMembership = `membership`;
export const postMembershipPay = `membership-pay`;
export const postRegisterMembership = `register-membership`;
export const postMembershipResendOtp = `membership-resend-otp`;
export const postVerifyMembershipotp = `verify-membership`;
export const postReNewMembershipPay = "renew-membership-payment";

export const quoteDelete = `quote/delete/`;
export const stockDelete = `stock-request/delete/`;
export const getDivisions = `cities?country_id=18`;
export const getDistricts = `cities?state_id=`;
export const profileUpdate = `profile/update`;

export const postQuote = `quote`;
export const stockList = `stock-list?user_id=`;
export const quoteList = `quote/all?user_id=`;

//*32
export const getBekarySlider = `bakery/slider`;
export const getBekaryTabCategory = `bakery/tab-category`;
export const getBekaryProduct = `bakery/product`;
export const getBekaryCategory = `bakery/category`;
export const getBakeryInfo = `bakery/pages`;

//*32
export const getUpcomingCelebrationDay = `upcoming-celebration-day`;
export const getEventWiseProduct = `event-wise-product/`;
export const getEventSlider = `event-slider`;
export const getEventList = `event-list`;
export const getPartyList = `partyList`;
//*33
export const getAllShops = `shops`;

export const getQuotePeople = `quotation`;
//*34
export const postAddress = `user/shipping/create`;
export const getSavedAdrs = `user/shipping/address/`;
export const deleteAddress = `user/shipping/delete/`;
export const updateAddress = `user/shipping/update`;
export const businessSettings = `business-settings`;
export const ALL_SLIDER_AD = `banners`;
export const PAGE_SECTION = `page-section`;
//*35
export const addSupplier = `add-supplier-reqs`;
export const addSupplierProductImg = `product-image`;
export const addSupplerDocument = `supplier-document/`;
export const getUomList = `unit-measurements`;
export const getCountryList = `countries`;

export const purchaseHis = `purchase-history`;

export const referralStats = `user/affiliate/stats`;
export const withdrawHistory = `user/affiliate/withdraw_history`;
export const logsOfUserData = `user/affiliate/logs`;
export const postWisthDraw = `user/affiliate/request_withdraw`;
export const paymentHis = `payment-history`;
export const postDefaultAddress = `user/shipping/make_default`;
export const getStorelist = `pickup-list`;
export const getPaymentTypes = `payment-types`;

export const addCart = `carts/add`;
export const getCart = `carts`;
export const addCartMultiple = `carts/add/multiple`;
export const getCouponList = `get-coupon-list`;
export const orderCreate = `order/store`;
export const getPaymentURL = `pay`;
export const orderDetails = `purchase-history-details/`;
export const applyCoupon = `coupon-apply`;
export const removeCoupon = `coupon-remove`;
export const postCompare = `addToCompare`;
export const getCompareList = `compare-product-list`;
export const deleteCompareItem = `deleteCompare`;
export const partyCategory = `party/category/all`;
export const partyList = `party`;
export const partyWiseProduct = `party/products/`;
export const bulkProducts = `products?is_bulk=1`;
export const getBazarlist = `monthly-bazar/all`;
export const deleteBazarItem = `monthly-bazar/delete/`;
export const getMoreItems = "products/more-item-to-consider?";
export const getrelatedProducts = `products/related/`;
export const getOfferItems = `products/offer?`;
export const postSubscribe = `subscribe`;
export const getUpComingCelebrations = "upcoming-celebration-day";
export const userOrderList = `user-order-list`;
export const getAllRecipyCategory = `recipe/category/all`;
export const postSupplierProImage = `/product-image`;
export const getSupplierRequest = `edit-supplier-reqs`;
export const postProductSupplier = `supplier-product/`;
export const updateSupplierRegistration = `update-supplier-reqs`;
export const collectionList = `collection`;
export const collectionProduct = `collection-product/`;
export const discountPartnerList = `all/membership/discount/partner`;
export const partyInfo = `party/`;

export const menuAll = `menu/all`;
export const getFuc___Division = `shipping_address/division_get`;
export const getFuc___District = `shipping_address/district_get?Divisionid=`;
export const getFuc___Upazilla = `shipping_address/upazilla_get?Districtid=`;
export const getFuc___Area = `shipping_address/area_delivery_charge_get?Upazilaid=`;
export const delete_Cart = `cart/delete/`;




export const pages = `/pages?id=`;
