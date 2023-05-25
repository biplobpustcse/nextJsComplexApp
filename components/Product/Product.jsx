import React from "react";
import ProductInfoHeader from "./ProductInfoHeader";
import { useEffect } from "react";
import { getFlashDealProducts} from "../lib/endpoints";
import {baseUrl} from "../../services/httpService";

const Product = ({
  headerText,
  Template,
  data,
  date,
    item,
  className,
  linkUrl = "#",
  section,
    hot
}) => {


  let url = section == 'flash' ? '/shop?'+getFlashDealProducts+'='+item?.id : linkUrl
  return (

    <>
      {data.length > 0 && (
        <section class="popularproduct-main">
          <div class="container-fluid">
            <ProductInfoHeader
              hotHeader={hot}
              headerText={headerText}
              date={date}
              linkUrl={url}
              section={section}
            />
            <Template data={data} />
          </div>
        </section>
      )}
    </>
  );
};

export default Product;
