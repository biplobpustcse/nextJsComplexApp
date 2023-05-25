import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { productDataConverter } from "../../../services/dataService";
import { baseUrl, http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getFlashDeals } from "../../lib/endpoints";
import Product from "../../Product/Product";
import HotSaleTemplate from "./HotSaleTemplate";

const HotSale = ({ data, setting,hot }) => {
  // const isVisible = setting.find((item) => item.type == businessType.Hotsale);
  //#region  clientSideRendering
  // const [isLoading, setIsLoading] = useState(true);
  // const [hotDealsData, setHotDealsData] = useState([]);
  // const [isVisibileError, setIsVisibleError] = useState(false);

  // const GetFlashDealAllProducts = useCallback(() => {
  //   http.get({
  //     url: getFlashDeals,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setHotDealsData(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   GetFlashDealAllProducts();
  // }, [GetFlashDealAllProducts]);

  // console.log();
  //#endregion

  return (
    <>
      {
        <>
          { data.map((item) => (
            <Product
              section='flash'
              hot={hot}
              headerText={item.title}
              date={item.date}
              item={item}
              Template={HotSaleTemplate}
              data={productDataConverter(item.products.data)}
            />
          ))}
        </>
      }
    </>
  );
};

export default HotSale;
