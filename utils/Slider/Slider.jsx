import React, {useEffect} from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const Slider = ({ Template, data, options, url }) => {


  return (
    <Splide options={options}>
      {data.map((item, index) => {

        return (
          <>
            <SplideSlide key={item || index}>
              <Template item={item} url={url} />
            </SplideSlide>
          </>
        );
      })}
    </Splide>
  );
};

export default Slider;
