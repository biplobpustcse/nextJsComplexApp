import Axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import {
  getAllProduct,
  getMoreItems,
  getOfferItems,
  getrelatedProducts,
} from "../../components/lib/endpoints";
import ProductView from "../../components/Product/ProductView";
import QuickView from "../../components/Product/QuickView";
import MoreItemsToConsider from "../../components/Shop/MoreItemsToConsider";
import RecentlyViewItem from "../../components/Shop/RecentlyViewItem";
import { productDataConverter } from "../../services/dataService";
import { baseUrl } from "../../services/httpService";
import { ProductAddtocart } from "../../utils/slider";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function ProductDetails({
  product,
  moreItems,
  relatedItems,
  offerItems,
  getError,
}) {
  const dispatch = useDispatch();
  console.log("produ", product);
  dispatch({
    type: "setViewProduct",
    payload: product?.data,
  });

  // const router = useRouter();
  // const [product, setProduct] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [isVisibileError, setIsVisibleError] = useState(false);

  // const getProduct = useCallback(()=>{
  //   http.get({
  //     url: getAllProduct + router.query.id,
  //     before: () => {
  //       setIsLoading(false);
  //     },
  //     successed: (res) => {
  //       console.log("log",res)
  //       setProduct(res);
  //       dispatch({
  //         type: "setViewProduct",
  //         payload: res,
  //       });
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // },[])
  // useEffect(() => {
  //   getProduct();
  // }, []);
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <section class="product-details-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="details-bg">
                <ProductView
                  store={{ product: product?.data[0] }}
                  isDetails={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* {<ProductAddtocart />} */}
      </section>
      <MoreItemsToConsider
        HeaderText={"More items to consider"}
        data={moreItems.data}
        url={""}
      />
      <MoreItemsToConsider
        HeaderText={"Sponsored items"}
        data={offerItems.data}
        url={""}
      />
      <MoreItemsToConsider
        HeaderText={"Similar items you might be like"}
        data={relatedItems.data}
        url={""}
      />
      <RecentlyViewItem />
      <QuickView />
      <SecondFooter />
      <SslFooter2 />
      {/* { setTimeout(() => {
        
      },1000)} */}
    </>
  );
}

export default ProductDetails;

export async function getServerSideProps(context) {
  const router = context.params?.id;
  let product,
    moreItems,
    relatedItems,
    offerItems,
    getError = false;

  let endpoints = [
    baseUrl + "/" + getAllProduct + router,
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + getrelatedProducts + router,
    baseUrl + "/" + getOfferItems,
  ];
  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(
        (
          { data: productData },
          { data: moreProducts },
          { data: relatedItem },
          { data: offerProducts }
        ) => {
          product = productData;
          moreItems = moreProducts;
          relatedItems = relatedItem;
          offerItems = offerProducts;
        }
      )
    );
  } catch (error) {
    product = null;
    moreItems = null;
    relatedItems = null;
    offerItems = null;
    getError = true;
  }

  return {
    props: { product, moreItems, relatedItems, offerItems, getError }, // will be passed to the page component as props
  };
}
