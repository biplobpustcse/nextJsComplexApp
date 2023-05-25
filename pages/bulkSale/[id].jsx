import Axios from "axios";
import React, { useState } from "react";
import BulkCategory from "../../components/BulkSale/BulkCategory";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import ShopProductView from "../../components/ShopExtraProductComponent/ShopProductView";
import {
  getMoreItems,
  partyCategory,
  partyInfo,
  partyWiseProduct,
} from "../../components/lib/endpoints";
import MoreItemsToConsider from "../../components/Shop/MoreItemsToConsider";
import RecentlyViewItem from "../../components/Shop/RecentlyViewItem";
import ShopProductShorting from "../../components/ShopExtraProductComponent/ShopProductShorting";
import { baseUrl } from "../../services/httpService";
import QuickView from "../../components/Product/QuickView";
import Slider from "../../utils/Slider/Slider";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

const template = ({ item }) => {
  return (
    <div class="home-slider">
      <img src={item.image} alt="" class="img-fluid" />
    </div>
  );
};
const options = {
  rewind: true,
  type: "loop",
  drag: "free",
  autoplay: true,
  rewindSpeed: 1000,
  speed: 1000,
  pauseOnHover: true,
  perPage: 3,
  width: "100%",
  breakpoints: {
    375: {
      perPage: 1,
    },
    576: {
      perPage: 2,
    },
    991: {
      perPage: 3,
    },
    992: {
      perPage: 4,
    },
    1024: {
      perPage: 4,
    },
    1200: {
      perPage: 5,
    },
  },
};
const index = ({
  bulkCategory,
  partyProducts,
  moreItems,
  partyINfoS,
  getError,
}) => {
  console.log({ partyINfoS });
  const [gridViewWise, setGridViewWsie] = useState(5);
  const breadCumbData = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: "Single Party",
    },
  ];
  const configuration = {
    priceRangeVisible: false,
    shopByBrandVisible: false,
    shopByRelevance: false,
  };
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <section class="home-slider-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="position-relative">
                <div class="card booking-info-card">
                  <h5 class="card-title text-center">Booking Info</h5>
                  <div class="card-body">
                    <ul>
                      <li>
                        <span>Booking Name: </span>
                        {partyINfoS.data[0].booking_name}
                      </li>
                      <li>
                        <span>Guest Person: </span>
                        {partyINfoS.data[0].guest_person}
                      </li>
                      <li>
                        <span>Party Name: </span>
                        {partyINfoS.data[0].short_description}
                      </li>
                      <li>
                        <span>Party Date: </span>
                        {partyINfoS.data[0].party_date}
                      </li>
                      <li>
                        <span>Party Time: </span>
                        {partyINfoS.data[0].party_time}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="homeslider-wrapper">
                  <div class="home-slider">
                    <img
                      src={partyINfoS.data[0].banner_image}
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                  {/* <template /> */}
                  {/* <Slider
                    Template={template}
                    options={options}
                    data={[partyINfoS.data.banner_image]}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BulkCategory data={bulkCategory.result} />
      <ShopProductShorting
        breadCumbData={breadCumbData}
        configuration={configuration}
        setGridViewWsie={setGridViewWsie}
      />
      {partyProducts != undefined && partyProducts.data != undefined && (
        <ShopProductView
          gridViewWise={gridViewWise}
          data={partyProducts.data}
        />
      )}

      <MoreItemsToConsider
        HeaderText={"More Items To Consider"}
        data={moreItems.data}
      />
      <RecentlyViewItem />
      <SecondFooter />
      <SslFooter2 />
      <QuickView />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res, query }) {
  let bulkCategory,
    partyProducts,
    moreItems,
    partyINfoS,
    getError = false;
  let endpoints = [
    baseUrl + "/" + partyCategory,
    baseUrl + "/" + partyWiseProduct + query.id,
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + partyInfo + query.id,
  ];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint))).then(
      Axios.spread(
        (
          { data: BulkCategoryList },
          { data: partyWiseProduct },
          { data: moreProducts },
          { data: partyyyyyyyInfo }
        ) => {
          bulkCategory = BulkCategoryList;
          partyProducts = partyWiseProduct;
          moreItems = moreProducts;
          partyINfoS = partyyyyyyyInfo;
        }
      )
    );
  } catch (error) {
    getError = true;
    bulkCategory = null;
    partyProducts = null;
    moreItems = null;
    partyINfoS = null;
  }
  return {
    props: { bulkCategory, partyProducts, moreItems, partyINfoS, getError }, // will be passed to the page component as props
  };
}
