import React from "react";
import Link from "next/link";
import CountingComponent from "./CountingComponent";
import { useDispatch } from "react-redux";
import router from "next/router";
const ProductInfoHeader = ({
  section,
  headerText,
  date,
  linkUrl = "#",
  hotHeader,
}) => {
  const getDateFromScnds = new Date(date * 1000);
  const { days, hours, minutes, seconds } = CountingComponent(getDateFromScnds);
  const dispatch = useDispatch();
  const breadcumb = (e) => {
    e.preventDefault();
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: headerText,
        link1: linkUrl,
        name2: "",
        link2: "",
        name3: "",
        link3: "",
        name4: "",
        link4: "",
        name5: "",
        id5: "",
      },
    });
    router.push(linkUrl);
  };
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="common-title-flex">
          <div className="left-box">
            <h3
              className={hotHeader ? "common-title hot-sale" : "common-title"}
            >
              {headerText}
            </h3>
            <div id="countdown">
              <div id="tiles">
                {date && (
                  <>
                    <span>{days}</span>:<span>{hours}</span>:
                    <span>{minutes}</span>:<span>{seconds}</span>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="center-box"></div>
          {linkUrl != "#" && section != "recent-view" && (
            <div className="right-box">
              <div passHref onClick={breadcumb} className="see-all-products">
                <a className="see-all-products">
                  see all <i className="fa-solid fa-chevron-right"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoHeader;
