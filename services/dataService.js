export const categoryShopDataConverter = (data) => {
  const obj = [];
  data.map((item) => {
    obj.push({
      id: item.id,
      name: item.name,
      logo: item.banner,
    });
  });
  return obj;
};
export const departmentDataConverter = (data) => {
  const obj = [];
  data.map((item) => {
    obj.push({
      id: item.id,
      name: item.name,
      logo: item.banner,
    });
  });
  return obj;
};

export const productDataConverter = (data) => {
  const obj = [];
  console.warn(data, 'po');
  if (data?.length > 0) {
    data.map((item) => {
      obj.push({
        id: item.id,
        name: item.name,
        image: item.thumbnail_image,
        discountPrice: item.base_discounted_price,
        stockedPrice: item.stroked_price,
        price:
          "main_price" in item
            ? parseFloat(item.main_price)
            : item?.base_price != undefined ? parseFloat(item?.base_price) : parseFloat(item?.price),
        rating: item.rating,
        sales: item.sales,
        links: item?.links?.details,
        photos: item.photos,
        todays_deal: item.todays_deal,
        featured: item.featured,
        unit: item.unit,
        min_qty: item.min_qty,
        sale_uom: item.sale_uom,
        member_price: item.member_price,
        discount_type: item.discount_type,
        discount: item.discount,
        rating: item.rating,
        sales: item.sales,
        colors: item.colors,
        sizes: item.sizes,
        variant: item.variant,
        is_variant: item.is_variant,
        is_cash_on_delivery: item.is_cash_on_delivery,
        is_quantity_multiplied: item.is_quantity_multiplied,
        user_barcode: item.user_barcode,
        wholesale_min_qty: item.wholesale_min_qty,
        wcl_price: item.wcl_price,
        links: item.links,
        weight: item.weight,
        is_weight: item.is_weight,
        flash_deal: item.flash_deal,
        promotion_code: item?.promotion_code,
        promotion_name: item?.promotion_name,
        promotion_type: item?.promotion_type,
        stock: item.stock,
        barcode: item.barcode,
        weight_min_qty: item?.weight_min_qty ?? 0,
        fraction_allow: item?.fraction_allow,
        uomkgyardQty: item?.uomkgyardQty ?? 0,
        tags: item?.tags,
        quote_applicable: item?.quote_applicable,
        is_request_stock: item?.is_request_stock,
        manage_stock: item?.manage_stock,
        is_negative: item?.is_negative,
        promotion_banner: item?.promotion_banner,
        silver_member_price: item?.silver_member_price,
        isPeak: item?.isPeak,
        offer: item?.offer ?? null,
        today_deal_price: item?.today_deal_price,
        discount_show: item?.discount_show,
        hasDiscount: item?.has_discount,
      });
    });
  }

  return obj;
};




export const productSortOrdering = (data, outOfStock = false) => {

  let placeholderImg = 'placeholder'
  let available_stock_with_img = data.filter((value) => {
    if (value.stock > 0 && !value?.thumbnail_image.includes(placeholderImg)) {
      return value
    }
  })

  let available_stock_without_img = data.filter((value) => {
    if (value.stock > 0 && value?.thumbnail_image.includes(placeholderImg)) {
      return value
    }
  })
  let out_of_stock = data.filter((value) => {
    if (value.stock <= 0) {
      return value
    }
  })

  let inStockProducts = [...available_stock_with_img, ...available_stock_without_img]
  let outOfStockProducts = [...out_of_stock]
  return {
    outOfStockProducts: outOfStockProducts,
    inStockProducts: inStockProducts,
  }

}
export const eventDataConverter = (data) => {
  const obj = [];
  data.map((item) => {
    obj.push({
      id: item?.id,
      title: item?.event_title,
      start: item?.event_date,
      end: item?.event_date,
    });
  });
  return obj;
};
