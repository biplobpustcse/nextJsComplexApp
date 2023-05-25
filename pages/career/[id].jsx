import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import CarrerJobDetails from "../../components/Carrer/JobDetails";
import { withRouter } from "next/router";
import { compose } from "redux";
import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { getHomeSliders } from "../../components/lib/endpoints";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function JobDetails(props) {
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
          <CarrerJobDetails id={props.router.query.id} />
          <SecondFooter />
          <SslFooter2 />
        </>
      )}
    </>
  );
}
export default compose(withRouter)(JobDetails);
// export default JobDetails
