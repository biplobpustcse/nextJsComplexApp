import { Provider, useDispatch } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux";
import "@splidejs/splide/dist/css/splide.min.css";
import "simplebar-react/dist/simplebar.min.css";
import Layout from "../components/Layout";

import "../utils/customStyle.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";
import { baseUrl } from "../services/httpService";
import { getHomeSliderProduct } from "../components/lib/endpoints";
import Axios from "axios";
import { Router, useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Bars, InfinitySpin, Watch } from "react-loader-spinner";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "../components/appComponent/AppErrorBoundary";
import AppErrorBoundary from "../components/appComponent/AppErrorBoundary";
export default withRedux(initStore, { debug: true })(function App(props) {
  const { Component, pageProps, store } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      //this.setState({ isLoading: true });
      setIsLoading(true);
      console.log("router change");
    });
    router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
      console.log("router change complete");
    });


  
  }, [router]);

  return (
    <React.Fragment>
      <AppErrorBoundary>
        <Provider store={store}>
          <Layout>
            {router.pathname != "/shop" &&
              router.pathname != "/all-brand" &&
              router.pathname != "/celebration" &&
              router.pathname != "/brand-shop" && (
                <>
                  {isLoading && (
                    <div className="loader-testing">
                      <InfinitySpin color="#004a96" />
                    </div>
                  )}

                  {!isLoading && (
                    <AppErrorBoundary>
                      <Component {...pageProps} />
                    </AppErrorBoundary>
                  )}
                </>
              )}
            {(router.pathname == "/shop" ||
              router.pathname == "/all-brand" ||
              router.pathname == "/celebration" ||
              router.pathname == "/brand-shop") && (

                <>

                  {isLoading && (
                    <div className="loader-testing">
                      <InfinitySpin color="#004a96" />
                    </div>
                  )}
                  <AppErrorBoundary>
                    <Component {...pageProps} />
                  </AppErrorBoundary>
                </>

              )}
            <ScrollToTop smooth color="#6f00ff" />

          </Layout>
        </Provider>
      </AppErrorBoundary>
      {/* <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        htmlRef="<REF_STRING>"
      /> */}
      <ToastContainer />
    </React.Fragment>
  );
});
