import React from 'react';
import SliderMain2 from '../../components/Home/MainSlider/SliderMain2';
import ShopCategoryNav from '../../components/Shop/ShopCategoryNav';
import SliderTemplate from '../../components/Home/MainSlider/SliderTemplate';
import RecipeSmSliderTemplate from '../../components/recipe/RecipeSmSliderTemplate';
import SliderWithText from '../../components/Home/MainSlider/SliderWithText';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { baseUrl, http } from '../../services/httpService';
import axios from 'axios';
import { productDataConverter } from '../../services/dataService';
import InfiniteScroll from 'react-infinite-scroller';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { InfinitySpin } from 'react-loader-spinner';
import MoreItemsToConsider from '../../components/Shop/MoreItemsToConsider';
import ShopProductTemplete from '../../components/Shop/ShopProductTemplete';
import ProductInfoModel from '../../components/Product/ProductInfoModel';
import FourColGridTemplate from '../../components/Shop/FourColGridTemplate';
import FiveColGridTemplate from '../../components/Shop/FiveColGridTemplate';
import ResturantInfoModel from '../../components/Product/ResturantInfoModel';
const Restaurant = ({ products }) => {
  const options = {
    rewind: true,
    type: 'loop',
    drag: 'free',
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 5,
    width: '100%',
    breakpoints: {
      320: {
        perPage: 1,
      },
      375: {
        perPage: 1,
      },
      576: {
        perPage: 1,
      },
      768: {
        perPage: 1,
      },
      991: {
        perPage: 1,
      },
      992: {
        perPage: 1,
      },
      1024: {
        perPage: 1,
      },
      1200: {
        perPage: 1,
      },
    },
  };
  let [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  let router = useRouter();

  let [sliderMain, setSliderMain] = useState([]);
  let [miniSliders, setMiniSliders] = useState([]);
  const GetProducts = (stringUrl, price1, stPageNo) => {
    let mainUrl = 'products?page=' + stPageNo + stringUrl;
    if (price1[0] !== undefined && price1[1] !== undefined) {
      mainUrl = mainUrl + '&min_price=' + price1[0] + '&max_price=' + price1[1];
    }
    // if(price1[1] == 20000){
    //   return
    // }

    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        //setProducts(prevState=> [...prevState],res)
        const mergeDate = [...products, ...res];
        let { inStockProducts, outOfStockProducts } =
          productSortOrdering(mergeDate);
        // setProducts(filterSortProduct(mergeDate));
        setProductList({
          out_of_stock_products: outOfStockProducts,
          available_stock_products: inStockProducts,
        });
        console.log(
          res,
          '============================================================================================'
        );
        if (res?.length > 0) {
          setProducts(inStockProducts);
        } else {
          setProducts([
            ...productList.available_stock_products,
            ...productList.out_of_stock_products,
          ]);
          setHasMore(false);
        }
        if (mergeDate.length === 0) {
          toast.error('No Product Found.');
        }

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };
  const getProductList = (stringUrl, price1) => {
    setIsLoading(true);
    //var st = page_limit == 0 ? start : page_limit + 1;
    var stPageNo = pageNo + 1;
    setPageNo(stPageNo);
    var end = page_limit + 10; //for Page let pageNo=Math.ceil(products.length / page_limit)+1;
    setPageLimit(end);
    const queryParam = '?offset=' + stPageNo + '&limit=' + end;
    const finalUrl = apiPath + queryParam;

    GetProducts(stringUrl, price1, stPageNo);
  };
  const template = FiveColGridTemplate;
  const GetProductsFirst = useCallback((stringUrl, price1) => {
    setPageNo(1);
    let mainUrl = 'products?page=' + pageNo + stringUrl;
    if (
      price1[0] !== undefined &&
      price1[1] !== undefined &&
      price1[1] != 20000
    ) {
      mainUrl = mainUrl + '&min_price=' + price1[0] + '&max_price=' + price1[1];
    }

    http.get1({
      url: mainUrl, //"products?page=0",
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        settotalCount(res.meta?.total);

        let { inStockProducts, outOfStockProducts } = productSortOrdering(
          res.data
        );
        // setProducts(filterSortProduct(mergeDate));
        setProductList({
          out_of_stock_products: outOfStockProducts,
          available_stock_products: inStockProducts,
        });

        // setProducts(filterSortProduct(res.data));
        setProducts(inStockProducts);
        const minprice = res.min_price;
        const maxprice = res.max_price;
        dispatch({
          type: 'SET_PRODUCT_PRICE',
          payload: [minprice, maxprice],
        });
        console.log(res.data, 'productData');
        if (res.data.length === 0) {
          setHasMore(false);
          toast.error('No Product Found.');
        }

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);
  const fetchMoreData = () => {
    if (router.asPath) {
      let strUrl = '';
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = strUrl + '&' + key + '=' + router.query[key])
      );
      if (products.length < totalCount) {
        setIsLoading(true);
        getProductList(strUrl, price);
      }
    }
  };
  let notPermit =
    router.query.hasOwnProperty('flash_deal') ||
    router.query.hasOwnProperty('brand_id') ||
    router.query.hasOwnProperty('section_id') ||
    router.query.hasOwnProperty('search') ||
    router.query.hasOwnProperty('essential') ||
    (router.pathname == '/shop' && Object.keys(router.query).length == 0);

  let fetchMiniSlider = async () => {
    try {
      let { data } = await axios.get(baseUrl + '/bakery/category?platform=web');
      setMiniSliders(data?.data ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  let fetchMainSlider = async () => {
    try {
      let { data } = await axios.get(baseUrl + '/bakery/slider');
      setSliderMain(data ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMiniSlider();
    fetchMainSlider();
  }, []);
  return (
    <>
      <SliderMain2 sliders={sliderMain} />
      <SliderTemplate
        sliders={miniSliders}
        Template={RecipeSmSliderTemplate}
        template={SliderWithText}
        options={options}
        url="/shop?cat_id="
      />
      <section className="whole-panda-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="panda-bg">
                <div className="five-col-grid-container">
                  {products?.length > 0 &&
                    productDataConverter(products).map((item) => {
                      return (
                        <>
                          <ResturantInfoModel item={item} />
                        </>
                      );
                    })}
                  {/* <InfiniteScroll
                  dataLength={products.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    isLoading && (
                      <div className={"text-center"}>
                        <InfinitySpin width="300" color="#004a96" />
                      </div>
                    )
                  }
                >
                  <ShopProductTemplete
                    products={products}
                    Templete={template}
                    Templete2={ResturantInfoModel}
                  />
                </InfiniteScroll> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    let { data } = await axios.get(baseUrl + '/bakery/product');
    return {
      props: {
        products: data?.data ?? [],
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
}
export default Restaurant;
