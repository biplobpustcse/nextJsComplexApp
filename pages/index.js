import { connect, useDispatch, useSelector } from "react-redux";
import initialize from "../utils/initialize";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";
import Product from "../components/Product/Product";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AlwaysOfferMain,
  BrandSlider,
  HotSaleSlider,
  MainSliderWrapper,
  QuotesSlider,
} from "../utils/slider";
import HotSale from "../components/Home/HotSale/HotSale";
import BrandShop from "../components/Home/BrandShop/BrandShop";
import POpularTabedPro from "../components/Home/PopularTabedProduct/POpularTabedPro";
import Advertisement from "../components/Home/Advertisement/Advertisement";
import ShopByCategory from "../components/Home/ShopCategory/ShopByCategory";
import ShopCategory from "../components/Home/ShopCategory/ShopCategory";
import CategoryByProduct from "../components/Home/CategoryByProduct/CategoryByProduct";
import Pantry from "../components/Home/Pantry/Pantry";
import DiscountedProduct from "../components/Home/DiscountedProduct/DiscountedProduct";
import Department from "../components/Home/Department/Department";
import BrandStore from "../components/Home/BrandStore/BrandStore";
import Quotes from "../components/Home/Quotes/Quotes";
import SliderMain from "../components/Home/MainSlider/SliderMain";
import React from "react";
import { SecondFooter } from "../components/Footer/SecondFooter";
import { SslFooter } from "../components/Footer/SslFooter";
import FashionCorenr from "../components/Home/FasionCorner/FashionCorenr";
import FacilityCorner from "../components/Home/FacilityCorner/FacilityCorner";
import DownloadAppCorner from "../components/Home/DownloadAppCorner/DownloadAppCorner";
import SecondFooter2 from "../components/Footer/SecondFooter2";
import SslFooter2 from "../components/Footer/SslFooter2";
import QuickView from "../components/Product/QuickView";
import dynamic from "next/dynamic";
import {
  ALL_SLIDER_AD,
  PAGE_SECTION,
  businessSettings,
  getBrandStore,
  getCategories,
  getFeatureDepartment,
  getFlashDeals,
  getHomeCategory,
  getHomeSliders,
  getPantry,
  getQuotePeople,
  getShopByCategory,
  getShopCategory,
  getShopsBrand,
} from "../components/lib/endpoints";
import { baseUrl, http } from "../services/httpService";
import Axios from "axios";
import { businessType } from "../utils/dictionaries";
import Banner from "../components/Home/banner/Banner";
import HotSaleTemplate from "../components/Home/HotSale/HotSaleTemplate";
import { productDataConverter } from "../services/dataService";
import Custom404 from "./404";
import { InfinitySpin } from "react-loader-spinner";
import { MessengerFbChat } from "../components/common/Messager";

const index = ({
  hotSaleData,
  brandShopData,
  shopCategoryData,
  categoryByProduct,
  pentryData,
  featureDptData,
  brandStoreData,
  sliders,
  quotesData,
  businessSetting,
  banners,
  sections,
  getError,
}) => {
  const FacilityCornerLC = dynamic(() =>
    import("../components/Home/FacilityCorner/FacilityCorner")
  );
  const BannerLC = dynamic(() => import("../components/Home/banner/Banner"));
  const PopularTabLC = dynamic(() =>
    import("../components/Home/PopularTabedProduct/POpularTabedPro")
  );
  const AdvertisementLC = dynamic(() =>
    import("../components/Home/Advertisement/Advertisement")
  );
  const ShopCategoryLC = dynamic(() =>
    import("../components/Home/ShopCategory/ShopCategory")
  );
  const ProductLC = dynamic(() => import("../components/Product/Product"));
  const dispatch = useDispatch()

  let findSection = (id) => {
    return sections.filter((item) => item.id == id && item.status == 1);
  };

  const store = useSelector((state) => state.HomeData);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  if (getError) {
    return <Custom404 />;
  }

  useEffect(() => {
    console.log(businessSetting)
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: "",
        link1: "",
        name2: "",
        link2: "",
        name3: "",
        link3: "",
        name4: "",
        link4: "",
        name5: "",
        id5: "",
      },
    });
  }, [])
  return (
    <>
      {/* <div className="loader-testing" >
        <InfinitySpin color="#004a96" />
      </div> */}

      <SliderMain sliders={sliders} />
      {hotSaleData.data.length > 0 && <HotSale data={hotSaleData.data} hot={true} />}
      {
        businessSetting?.data.find((item) => {
          if (item.type == 'brand_shop') {
            return parseInt(item.value) == 1
          }
        }) && (brandShopData.data.length > 0 && <BrandShop data={brandShopData.data} />)
      }
      <PopularTabLC />
      <AdvertisementLC />
      <BannerLC
        banner={banners?.home_banner_one?.slice(0, 1)}
        col="banner-col col-xs-12 col-sm-12 col-md-12 col-lg-12"
      />
      {shopCategoryData.data.length > 0 && (
        <ShopCategoryLC data={shopCategoryData.data} />
      )}
      {/* {categoryByProduct.data.length > 0 && (
        <CategoryByProduct data={categoryByProduct.data} />
      )} */}
      {findSection(1).map((item) => {
        return (
          <ProductLC
            Template={HotSaleTemplate}
            headerText={item?.title}
            linkUrl={"/shop?section_id=" + item?.id}
            section={'section'}
            data={productDataConverter(item.products?.data)}
          />
        );
      })}

      {pentryData.data.length > 0 && <Pantry data={pentryData.data} />}
      {findSection(2).map((item) => {
        return (
          <ProductLC
            Template={HotSaleTemplate}
            headerText={item?.title}
            linkUrl={"/shop?section_id=" + item?.id}
            section={'section'}
            data={productDataConverter(item.products?.data)}
          />
        );
      })}

      {/* <FashionCorenr /> */}

      <BannerLC
        banner={banners.home_banner_two?.slice(0, 2)}
        col="banner-col col-xs-12 col-sm-12 col-md-6 col-lg-6"
      />
      {findSection(3).map((item) => {
        return (
          <ProductLC
            Template={HotSaleTemplate}
            headerText={item?.title}
            linkUrl={"/shop?section_id=" + item?.id}
            section={'section'}
            data={productDataConverter(item.products?.data)}
          />
        );
      })}
      <DiscountedProduct />
      {featureDptData.data.length > 0 && (
        <Department data={featureDptData.data} />
      )}
      {brandStoreData.data.length > 0 && (
        <BrandStore data={brandStoreData.data} />
      )}

      {/* Men */}
      {/* {categoryByProduct.data.length > 0 && (
        <CategoryByProduct data={categoryByProduct.data} showMan={true} />
      )} */}
      {findSection(4).map((item) => {
        return (
          <ProductLC
            Template={HotSaleTemplate}
            headerText={item?.title}
            linkUrl={"/shop?section_id=" + item?.id}
            section={'section'}
            data={productDataConverter(item.products?.data)}
          />
        );
      })}
      {findSection(5).map((item) => {
        return (
          <ProductLC
            Template={HotSaleTemplate}
            headerText={item?.title}
            linkUrl={"/shop?section_id=" + item?.id}
            section={'section'}
            data={productDataConverter(item.products?.data)}
          />
        );
      })}
      <BannerLC
        banner={banners.home_banner_three?.slice(0, 3)}
        col="banner-col col-xs-12 col-sm-12 col-md-4 col-lg-4"
      />
      {quotesData.length > 0 && <Quotes data={quotesData} />}

      {/* <FacilityCorner /> */}

      {/* <MessengerFbChat /> */}
      <FacilityCornerLC />
      <DownloadAppCorner />
      <SecondFooter2 />
      <SslFooter2 />
      <QuickView />
    </>
  );
};

export async function getServerSideProps(context) {
  let hotSaleData,
    brandShopData,
    shopCategoryData,
    categoryByProduct,
    pentryData,
    featureDptData,
    brandStoreData,
    sliders,
    quotesData,
    businessSetting,
    banners,
    sections,
    getError = false;
  try {
    let endpoints = [];
    const responseBusinessSettings = await Axios.get(
      baseUrl + "/" + businessSettings
    );
    businessSetting = await JSON.parse(
      JSON.stringify(responseBusinessSettings.data)
    );
    //! all banner ad
    let { data } = await Axios.get(baseUrl + "/" + ALL_SLIDER_AD);
    banners = data.data;
    console.warn("banners: ", banners);
    //! all banner

    //? page section
    let { data: page_section } = await Axios.get(baseUrl + "/" + PAGE_SECTION);
    sections = page_section.data;

    //? end page section

    if (
      businessSetting.data.find((item) => item.type == businessType.Hotsale)
        .value == 1
    ) {
      const responseHotSale = await Axios.get(baseUrl + "/" + getFlashDeals);
      hotSaleData = await JSON.parse(JSON.stringify(responseHotSale.data));
    } else {
      hotSaleData = { data: [] };
    }

    if (
      businessSetting.data.find((item) => item.type == businessType.BrandShop)
        .value == 1
    ) {
      const responseBrandShopData = await Axios.get(
        baseUrl + "/" + getShopsBrand + "?brand_store=1"
      );
      brandShopData = await JSON.parse(
        JSON.stringify(responseBrandShopData.data)
      );
    } else {
      brandShopData = { data: [] };
    }
    if (
      businessSetting.data.find(
        (item) => item.type == businessType.ShopByCategory
      ).value == 1
    ) {
      const responseShopCategoryData = await Axios.get(
        baseUrl + "/" + getCategories + "?is_shop_by_category=1"
      );
      shopCategoryData = await JSON.parse(
        JSON.stringify(responseShopCategoryData.data)
      );
    } else {
      shopCategoryData = { data: [] };
    }
    if (
      businessSetting.data.find((item) => item.type == businessType.Category)
        .value == 1
    ) {
      const responseCategoryByProduct = await Axios.get(
        baseUrl + "/" + getHomeCategory
      );
      categoryByProduct = await JSON.parse(
        JSON.stringify(responseCategoryByProduct.data)
      );
    } else {
      categoryByProduct = { data: [] };
    }

    if (
      businessSetting.data.find((item) => item.type == businessType.Pantry)
        .value == 1
    ) {
      const responsePantryData = await Axios.get(baseUrl + "/" + getPantry);
      pentryData = await JSON.parse(JSON.stringify(responsePantryData.data));
    } else {
      pentryData = { data: [] };
    }
    if (
      businessSetting.data.find((item) => item.type == businessType.FeatureDept)
        .value == 1
    ) {
      const responseFeatureDptData = await Axios.get(
        baseUrl + "/" + getFeatureDepartment
      );
      featureDptData = await JSON.parse(
        JSON.stringify(responseFeatureDptData.data)
      );
    } else {
      featureDptData = { result: [] };
    }

    if (
      businessSetting.data.find((item) => item.type == businessType.BrandStore)
        .value == 1
    ) {
      const responseBrandStore = await Axios.get(baseUrl + "/" + getBrandStore + '?brand_store=1');
      brandStoreData = await JSON.parse(
        JSON.stringify(responseBrandStore.data)
      );
    } else {
      brandStoreData = { data: [] };
    }
    if (
      businessSetting.data.find((item) => item.type == businessType.Quotes)
        .value == 1
    ) {
      const responseQuotePeople = await Axios.get(
        baseUrl + "/" + getQuotePeople
      );
      quotesData = await JSON.parse(JSON.stringify(responseQuotePeople.data));
    } else {
      quotesData = [];
    }
    const responseSliders = await Axios.get(baseUrl + "/" + getHomeSliders);
    sliders = await JSON.parse(JSON.stringify(responseSliders.data));
  } catch (error) {

    (hotSaleData = null),
      (brandShopData = null),
      (shopCategoryData = null),
      (categoryByProduct = null),
      (pentryData = null),
      (featureDptData = null),
      (brandStoreData = null),
      (sliders = null),
      (quotesData = null),
      (businessSetting = null),
      (banners = null),
      (sections = null),
      (getError = true);
  }
  console.log({
    hotSaleData,
    brandShopData,
    shopCategoryData,
    categoryByProduct,
    pentryData,
    featureDptData,
    brandStoreData,
    sliders,
    quotesData,
    businessSetting,
    banners,
    sections,
    getError,
  })
  return {
    props: {
      hotSaleData,
      brandShopData,
      shopCategoryData,
      categoryByProduct,
      pentryData,
      featureDptData,
      brandStoreData,
      sliders,
      quotesData,
      businessSetting,
      banners,
      sections,
      getError,
    }, // will be passed to the page component as props
  };
}

export default index;
