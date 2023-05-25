import OfferSliderMain from "./OfferSliderMain";
import PrimarySliderMain from "./PrimarySliderMain";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { http } from "../../../services/httpService";
import { getHomeSliders } from "../../lib/endpoints";

function SliderMain({sliders}) {
  
  return (
    <>
      
      <PrimarySliderMain sliders={sliders} />
    </>
  );
}

export default SliderMain;
