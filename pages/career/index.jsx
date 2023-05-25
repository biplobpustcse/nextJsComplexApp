import { connect } from "react-redux";
import initialize from "../../utils/initialize";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import Carrer from "../../components/Carrer/Carrer";
import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { getHomeSliders } from "../../components/lib/endpoints";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import { SslFooter } from "../../components/Footer/SslFooter";
import { useRouter } from "next/router";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";

function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState("");
  const [isVisibileError, setIsVisibleError] = useState(false);

  const GetHomeSliders = useCallback(() => {
    http.get({
      url: getHomeSliders,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setSliders(res);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    GetHomeSliders();
  }, [GetHomeSliders]);
  return (
    <>
      {!isLoading && (
        <>
          <SliderMain2 sliders={sliders.home_slider_images} />

          <section class="online-apply">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="online-apply-border">
                    <div
                      class="apply-online-btn"
                      onClick={() => {
                        router.push("/apply-Registration");
                      }}
                    >
                      job apply online
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Carrer />
          <SecondFooter />
          <SslFooter2 />
        </>
      )}
    </>
  );
}

Index.getInitialProps = function (ctx) {
  initialize(ctx);
};

export default connect((state) => state)(Index);
