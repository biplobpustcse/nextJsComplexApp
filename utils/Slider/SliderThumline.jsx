import React, { useEffect, useRef, useState } from 'react';
import ProductSliderTemplate from '../../components/Product/ProductSliderTemplate';
import { Splide, SplideSlide } from '@splidejs/react-splide';

// var Drift = require('drift-zoom');
// import {
//   MagnifierContainer,
//   MagnifierPreview,
//   MagnifierZoom,
//   SideBySideMagnifier,
// } from "react-image-magnifiers";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
  MagnifierContainer,
} from 'react-image-magnifiers';
import { ZoomImage } from '../slider';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';

function SliderThumline({ item ,product}) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(item[0]?.path);
  const [thumbImg, setThumbImg] = useState(product?.thumbnail_image);
  let images = [];
  const ref = useRef();
  const ref1 = useRef();
  item?.map((img, index) => {
    images.push(img.path);
  });
  // original: img.path,
  //     thumbnail: img.path,

  // item?.map((img) => {
  //   images.push({
  //     original: img.path,
  //     thumbnail: img.path,
  //   });
  // });
  const handleClickImage = (event, image) => {
    setSelectedImage(image);
    // ZoomImage();
  };
  useEffect(() => {
    item?.map((img, index) => {
      if (index == 0) {
        setSelectedImage(img.path);
      }
    });

  }, [router.asPath]);
  console.log(product,'thmb')

  const options = {
    rewind: true,
    type: 'slide',
    // type: "loop",
    drag: 'free',
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 10,
    perMove: 1,
    width: '100%',
    breakpoints: {
      375: {
        perPage: 4,
      },
      576: {
        perPage: 4,
      },
      768: {
        perPage: 4,
      },
      991: {
        perPage: 5,
      },
      1024: {
        perPage: 5,
      },
      1200: {
        perPage: 5,
      },
    },
  };

  return (
    <>
      <div>
        <div class="parent">
          <img src={thumbImg != null ? thumbImg : selectedImage} className="img-fluid" style={{}} />
        </div>
        {/* <span class="contain" style={{ zIndex: "99999999999999" }}></span> */}
      </div>

      {images?.length > 0 && (
        // <div style={{ height: "100px" }}>
        <div className="details-slider-thumnil">
          <Splide options={options}>
            {images.map((item, index) => (
              <>
                <SplideSlide key={item || index}>
                  <ProductSliderTemplate
                    item={item}
                    selectedImg={selectedImage}
                    handleClickImage={handleClickImage}
                  />
                </SplideSlide>
              </>
            ))}
          </Splide>
          {/* <Slider
            options={options}
            Template={ProductSliderTemplate}
            data={images}
            url={"url"}
          /> */}
          {/* <SliderTemplate
            sliders={images}
            Template={SecondarySliderTemplate}
            template={CommonSliderTemplate}
            options={options}
          /> */}
        </div>
      )}
      <ZoomImage selectedImage={selectedImage} />
      {/* <SideBySideMagnifier
        imageSrc={selectedImage}
        imageAlt="Example"
        // className="previewImg"
        largeImageSrc={selectedImage} // Optional
        style={{ height: "400px", width: "750px" }}
      /> */}

      {/* <MagnifierContainer style={{ height: "400px", width: "750px" }}>
        <div
          className="example-class"
          // style={{ width: "300px", height: "400px", textAlign: "center" }}
          style={{ height: "400px", width: "750px" }}
        >
          <SideBySideMagnifier
            style={{ height: "400px", width: "750px" }}
            imageSrc={selectedImage}
            alwaysInPlace={false}
            // overlayBoxImageSize={"300px"}
          />
        </div>
      </MagnifierContainer> */}
    </>
  );
}

export default SliderThumline;
