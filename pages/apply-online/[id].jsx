import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import { withRouter } from "next/router";
import { compose } from "redux";
import JobOnlineApply from "../../components/Carrer/Apply";

import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { getHomeSliders } from "../../components/lib/endpoints";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function ApplyOnline(props) {
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
      {sliders?.home_slider_images && (
        <SliderMain2 sliders={sliders.home_slider_images} />
      )}
      <JobOnlineApply id={props.router.query.id} />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}
// export default compose(withRouter)(ApplyOnline);

export default compose(withRouter)(ApplyOnline);
// export default JobDetails
