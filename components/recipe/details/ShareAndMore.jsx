import React, { useState } from "react";
import { ShowRating, ShowShare } from "../../../utils/slider";
import Rating from "@material-ui/lab/Rating";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";

function ShareAndMore() {
  const [value, setValue] = useState(1);
  const changeRate = (e, newValue) => {
    setValue(newValue);
  };
  const printClick = (e) => {
    var printContents = document.getElementById("content").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  console.log("value", value);
  return (
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="recipe-share-main">
        <div class="common-fieldset-main">
          <fieldset class="common-fieldset">
            <legend class="rounded">
              <i class="icofont-share me-2"></i>share & more
            </legend>
            <ul class="nav justify-content-center social-share-nav">
              <li class="nav-item">
                <a href="" class="nav-link">
                  <span class="icon">
                    <i class="fa-regular fa-heart"></i>
                  </span>
                  save
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0);" class="nav-link show-rating">
                  <span class="icon">
                    <i class="fa-regular fa-star"></i>
                  </span>
                  rating
                </a>
                <div class="custom-dropdown c-rating-dropdown d-none">
                  <div class="dropdown-title">
                    <h4>rate us</h4>
                  </div>
                  <div class="padding-box">
                    <Rating
                      name="simple-controlled"
                      value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      onChange={(e, newValue) => changeRate(e, newValue)}
                    />
                    {/* <ul class="nav justify-content-center">
                     
                    </ul> */}
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={(e) => printClick(e)}>
                  <span class="icon">
                    <i class="fa-solid fa-print"></i>
                  </span>
                  print
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0);" class="nav-link show-share">
                  <span class="icon">
                    <i class="fa-solid fa-share-nodes"></i>
                  </span>
                  share
                </a>
                <div class="custom-dropdown c-share-dropdown d-none">
                  <div class="dropdown-title">
                    <h4>share & more</h4>
                  </div>
                  <div class="padding-box">
                    <ul class="nav justify-content-center">
                      <li class="nav-item">
                        <FacebookShareButton url="https://www.npmjs.com/package/react-share">
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </li>
                      <li class="nav-item">
                        <TwitterShareButton url="https://www.npmjs.com/package/react-share">
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                      </li>
                      <li class="nav-item">
                        <EmailShareButton url="https://www.npmjs.com/package/react-share">
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                      </li>
                      <li class="nav-item">
                        <FacebookMessengerShareButton url="https://developers.facebook.com/docs/plugins/embedded-posts/">
                          <FacebookMessengerIcon size={32} round />
                        </FacebookMessengerShareButton>
                      </li>
                      <li class="nav-item">
                        <PinterestShareButton url="https://developers.facebook.com/docs/plugins/embedded-posts/"  media="https://developers.facebook.com/docs/plugins/embedded-posts/" description="">
                          <PinterestIcon size={32} round />
                        </PinterestShareButton>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </fieldset>
        </div>
      </div>
      <ShowRating />
      <ShowShare />
    </div>
  );
}

export default ShareAndMore;
