import React, { useCallback, useEffect, useState } from "react";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import BrandShopTemplate from "../Home/BrandShop/BrandShopTemplate";
import HotSaleTemplate from "../Home/HotSale/HotSaleTemplate";
import { bulkProducts, getShopsBrand } from "../lib/endpoints";
import Product from "../Product/Product";

const RecentlyViewItem = () => {
  const HeaderText = "YOUR RECENTLY VIEWED ITEMS";
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("viewProducts")
      ? JSON.parse(localStorage.getItem("viewProducts"))
      : [];
    const recentIds = data?.map((item) => {
      return item.id;
    });
    if (recentIds.length == 0) {
      return;
    }
    http.get({
      url: "products?product_ids=" + encodeURIComponent(recentIds),
      successed: (res) => {
        setItemData(productDataConverter(res ? res : []));
      },
    });
  }, []);
  return (
    <>
      {itemData && itemData.length > 0 && (
        <Product
          headerText={HeaderText}
          Template={HotSaleTemplate}
          section="recent-view"
          data={itemData}
        />
      )}
    </>
  );
};

export default RecentlyViewItem;
