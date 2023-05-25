import { Router, useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Celebration from "../../components/Celebration/Celebration";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import SliderTemplate from "../../components/Home/MainSlider/SliderTemplate";
import SliderWithText from "../../components/Home/MainSlider/SliderWithText";
import {
  getEventList,
  getEventSlider,
  getMoreItems,
  getPartyList,
  getUpcomingCelebrationDay,
} from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";
import RecipeSmSliderTemplate from "../../components/recipe/RecipeSmSliderTemplate";
import ShopProductShorting from "../../components/Shop/ShopProductShorting";
import { eventDataConverter } from "../../services/dataService";
import { baseUrl, http } from "../../services/httpService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Axios from "axios";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import { InfinitySpin } from "react-loader-spinner";
import Custom404 from "../404";
import { toast } from "react-toastify";
import {SecondFooter} from "../../components/Footer/SecondFooter";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

function index({
  moreItems,
  sliderData,
  router2,
  partyListData,
  celeSliderData,
  eventSliderData,
  getError,
}) {
  console.log(
    { sliderData },
    { router2 },
    { partyListData },
    { celeSliderData },
    { eventSliderData }
  );
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState(
    [sliderData.data[0]?.event_banner] || []
  );
  const [partySlider, setPartySlider] = useState(partyListData.data || []);
  const [upCommingEventSlider, setUpCommingEventSlider] = useState(
    celeSliderData.data || []
  );
  const [eventList, setEventList] = useState(
    eventDataConverter(eventSliderData.data) || []
  );

  const router = useRouter();
  const [price, setPrice] = useState([0, 20000]);

  const [oneView, setOneView] = useState(false);
  const [twoView, setTwoView] = useState(false);
  const [threeView, setThreeView] = useState(true);

  const handleClick = (event, isview) => {

    if (isview == "two") {
      setTwoView(true);
      setThreeView(false);
      setOneView(false);

    } else if (isview == "three") {
      setTwoView(false);
      setThreeView(true);
      setOneView(false);

    } else if(isview == 'row') {
      setOneView(true);
      setTwoView(false);
      setThreeView(false);
    }
  };

  // const GetHomeSliders = useCallback(() => {
  //   http.get({
  //     url: getEventSlider,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       console.log("resss", res);
  //       setSliders(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);

  // const GetPartySlider = useCallback(() => {
  //   http.get({
  //     url: getPartyList,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setPartySlider(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);

  // const GetUpcomingEventSliders = useCallback(() => {
  //   http.get({
  //     url: getUpcomingCelebrationDay,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setUpCommingEventSlider(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);

  // const GetEventListById = useCallback((id) => {
  //   http.get({
  //     url: getEventList + "?id=" + id,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       console.log("res", res);
  //       let currentSlider = [];
  //       currentSlider.push(res[0]?.event_banner);
  //       setSliders(currentSlider);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // });
  // const GetEventList = useCallback(() => {
  //   http.get({
  //     url: getEventList,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setEventList(eventDataConverter(res));
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // });
  // useEffect(() => {
  // GetHomeSliders();

  // GetEventListById(router.query.id);
  // GetEventList();
  // GetPartySlider();
  // GetUpcomingEventSliders();

  // dispatch({
  //   type: "setBredCumbdata",
  //   payload: {
  //     name1: "",
  //     link1: "",
  //     name2: "",
  //     link2: "",
  //     name3: "",
  //     link3: "",
  //     name4: "",
  //     link4: "",
  //   },
  // });
  // }, [router.asPath]);

  const options = {
    rewind: true,
    type: "loop",
    drag: "free",
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 8,
    width: "100%",
    breakpoints: {
      375: {
        perPage: 1,
      },
      575: {
        perPage: 1,
      },
      576: {
        perPage: 2,
      },
      767: {
        perPage: 2,
      },
      768: {
        perPage: 3,
      },
      991: {
        perPage: 3,
      },
      992: {
        perPage: 4,
      },
      1200: {
        perPage: 4,
      },
      1201: {
        perPage: 4,
      },
      1400: {
        perPage: 5
      }
    },
  };
  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);
  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getElement = document.getElementById("logoClick");

    document.body.addEventListener("click", () => {
      Router.events.on("routeChangeStart", (url) => {
        //this.setState({ isLoading: true });
        setLoader(true);
        console.log("router change");
      });
      Router.events.on("routeChangeComplete", (url) => {
        //this.setState({ isLoading: false });
        // setTimeout(() => {
        //   setLoader(false);
        // }, [1000]);
        setLoader(false);
        console.log("router change complete");
      });
    });
  }, [Router]);
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      {loader && (
        <div className="loader-testing">
          <InfinitySpin width="300" color="#004a96" />
        </div>
      )}
      <div className="row">
        <div className="col-12">
          {sliders.length > 0 && (
            <SliderMain2 className="celebration-slider" sliders={sliders} />
          )}
          <div className="calendar-wrapper">
            <Calendar
              views={["month"]}
              selectable
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={eventList}
              onSelectEvent={(event) => toast.success(event.title)}
            />
          </div>
        </div>
      </div>

      {upCommingEventSlider?.length > 0 && (
        <SliderTemplate
          sliders={upCommingEventSlider}
          Template={RecipeSmSliderTemplate}
          template={SliderWithText}
          options={options}
          url="/celebration?id="
        />
      )}
      {partySlider?.length > 0 && (
        <SliderTemplate
          sliders={partySlider}
          Template={RecipeSmSliderTemplate}
          template={SliderWithText}
          options={options}
          url="/celebration?id="
        />
      )}

      <ShopProductShorting
        handleClick={handleClick}
        setPrice={setPrice}
        price={price}
        showPrice={false}
        showBrands={true}
        showRevalance={true}
        viewAsFormat={2}
      />
      <Celebration
        price={price}
        oneView={oneView}
        twoView={twoView}
        threeView={threeView}
        moreItems={moreItems.data}
      />
      <SecondFooter />
      <SslFooter2 />
      <QuickView />
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const router2 = context.query.id;
  let product,
    moreItems,
    relatedItems,
    offerItems,
    sliderData,
    partyListData,
    celeSliderData,
    eventSliderData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + getEventList + "?id=" + router2,
    baseUrl + "/" + getPartyList,
    baseUrl + "/" + getUpcomingCelebrationDay,
    baseUrl + "/" + getEventList,
  ];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(
        (
          { data: moreProducts },
          { data: sliderSMainData },
          { data: partyData },
          { data: celebrationData },
          { data: eventSlider }
        ) => {
          moreItems = moreProducts;
          sliderData = sliderSMainData;
          partyListData = partyData;
          celeSliderData = celebrationData;
          eventSliderData = eventSlider;
        }
      )
    );
  } catch (error) {
    moreItems = null;
    sliderData = null;
    partyListData = null;
    celeSliderData = null;
    eventSliderData = null;
    getError = true;
  }

  return {
    props: {
      moreItems,
      sliderData,
      router2,
      partyListData,
      celeSliderData,
      eventSliderData,
      getError,
    }, // will be passed to the page component as props
  };
}
