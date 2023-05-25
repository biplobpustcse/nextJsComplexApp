import { Rating } from "@material-ui/lab";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { http } from "../../services/httpService";
import {
  getReviewsByProduct,
  postLogin,
  postReview,
  postVoteReview,
} from "../lib/endpoints";
import { withStyles } from "@material-ui/core";
import { ShowRating } from "../../utils/slider";
import { toast } from "react-toastify";

function ProductRatingTemplate({ product }) {
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(1);
  const [review, setReview] = useState("");
  const [aLLReview, setAllReview] = useState("");
  const [sortByRate, setSortByRate] = useState();
  const [sortBy, setSortBy] = useState();
  const [showBy, setShowBy] = useState();
  const [starCount, setStarCount] = useState();
  const [totalStarCount, setTotalStarCount] = useState();

  const [showReview, setShowReview] = useState(false);
  //progressbar
  const StyledRating = withStyles({
    iconFilled: {
      color: "#004a96",
    },
    iconHover: {
      color: "#004a96",
    },
  })(Rating);

  const changeRate = (e, newValue) => {
    setValue(newValue);
  };
  function handleChangeRate(event) {
    setSortByRate(event.target.value);
    getReviewData(event.target.value, "", "");
  }
  function handleChangeSortBy(event) {
    setSortBy(event.target.value);
    getReviewData("", event.target.value, "");
  }
  function handleChangeShowBy(event) {
    setShowBy(event.target.value);
    getReviewData("", "", event.target.value);
  }
  function getReviewData(rateByData, sortByData, showByData) {
    let url =
      rateByData != "" || sortByData != "" || showByData != "" ? "?" : "";
    console.log("url3", url, rateByData);
    if (rateByData != "") url += "sort_by_rating=" + rateByData;
    else if (sortByData != "") url += "sort_by=" + sortByData;
    else if (showByData != "") url += "sort_by_show=" + showByData;
    console.log("url34", url);
    http.get1({
      url: getReviewsByProduct + product.id + url,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setAllReview(res.data);
        setStarCount(res.star_count);
        setTotalStarCount(
          res.star_count?.five +
            res.star_count?.four +
            res.star_count?.three +
            res.star_count?.two +
            res.star_count?.one
        );
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    http.post({
      url: postReview,
      payload: {
        product_id: product.id,
        user_id: user?.user.id,
        rating: value,
        comment: review,
      },
      before: () => {},
      successed: (res) => {
        if (!res.result) {
          toast.error(res.message);
        }
        console.log("res", product.id, user?.id, value, review);
      },
      failed: () => {
        setIsValid(true);
      },
    });
  }
  function handleReview(e) {
    setReview(e.target.value);
  }
  function handleWriteReview() {
    let user = localStorage.getItem("USERWHOLESALE25");
    if (!user) {
      router.push({ pathname: "/auth" });
    }
  }
  const handleVoteReview = (evt, userReview) => {
    evt.preventDefault();
    let user = localStorage.getItem("USERWHOLESALE25");
    if (!user) {
      router.push({ pathname: "/auth" });
    }
    http.post({
      url: postVoteReview + userReview.id,
      payload: {
        vote: userReview.vote,
      },
      before: () => {},
      successed: (res) => {
        console.log("res", res);
        getReviewData(sortBy ? sortBy : "", "", "");
      },
      failed: () => {},
    });
  };
  useEffect(() => {
    let user = localStorage.getItem("USERWHOLESALE25");
    if (user) {
      setShowReview(true);
    }
  }, []);
  useEffect(() => {
    getReviewData("", "", "");
  }, []);
  return (
    <div class="review-main">
      <div className="py-2">
        <h3> Customer reviews</h3>
        <StyledRating
          name="simple-controlled"
          value={product?.rating}
          size="small"
          readOnly
        />{" "}
        <span>{product?.rating}</span>{" "}
        <span>| {product.rating_count} reviews</span>
      </div>
      <div class="review-filters">
        <div class="search-box">
          <form action="">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search topics & reviews"
              />
              <button class="btn review-search-btn">
                <i class="icofont-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="rating-overview">
          <div class="single-rating">
            <h3>{product?.rating}</h3>
            <p>avg. customer ratings</p>
          </div>
          <div class="single-rating">
            <h3>{product.rating_count}</h3>
            <p>reviews</p>
          </div>
          <div class="single-rating">
            <h3>{product.qus_count}</h3>
            <p>questions</p>
          </div>
          <div class="single-rating">
            <h3>{product.ans_count}</h3>
            <p>answer</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
          <div class="progress-bg">
            <div class="progress-flex">
              <div class="star-box">
                5 <i class="icofont-star"></i>
              </div>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{
                    width: (starCount?.five * 100) / totalStarCount + "%",
                  }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="star-count">{starCount?.five}</div>
            </div>

            <div class="progress-flex">
              <div class="star-box">
                4 <i class="icofont-star"></i>
              </div>

              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{
                    width: (starCount?.four * 100) / totalStarCount + "%",
                  }}
                  aria-valuenow="55"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="star-count">{starCount?.four}</div>
            </div>
            <div class="progress-flex">
              <div class="star-box">
                3 <i class="icofont-star"></i>
              </div>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{
                    width: (starCount?.three * 100) / totalStarCount + "%",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="star-count">{starCount?.three}</div>
            </div>
            <div class="progress-flex">
              <div class="star-box">
                2<i class="icofont-star"></i>
              </div>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{
                    width: (starCount?.two * 100) / totalStarCount + "%",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="star-count">{starCount?.two}</div>
            </div>
            <div class="progress-flex">
              <div class="star-box">
                1 <i class="icofont-star"></i>
              </div>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{
                    width: (starCount?.one * 100) / totalStarCount + "%",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="star-count">{starCount?.one}</div>
            </div>
          </div>
          <a class="btn write-review-btn" onClick={handleWriteReview}>
            write a review
          </a>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9">
          {showReview && (
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="write-review-wrapper">
                  <ul class="nav rate-nav">
                    <li class="nav-item">
                      <a class="nav-link disabled me-2" href="#">
                        Your Rating:
                      </a>
                    </li>
                    <StyledRating
                      name="simple-controlled"
                      value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      onChange={(e, newValue) => changeRate(e, newValue)}
                    />
                  </ul>
                  <div class="write-review-form">
                    <form action="">
                      <label for="">Write a review</label>
                      <div class="form-floating">
                        <textarea
                          class="form-control w-100"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: "100px" }}
                          value={review}
                          onChange={handleReview}
                        ></textarea>
                        <button class="btn" onClick={handleSubmit}>
                          Post review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="mb-3 row">
                <label for="" class="col-sm-4 col-form-label">
                  sort by
                </label>
                <div class="col-sm-8">
                  <select
                    class="form-select"
                    aria-label="Default"
                    value={sortByRate}
                    onChange={(e) => handleChangeRate(e)}
                  >
                    <option value="" selected>
                      rating
                    </option>
                    <option value="1">1 star</option>
                    <option value="2">2 star</option>
                    <option value="3">3 star</option>
                    <option value="4">4 star</option>
                    <option value="5">5 star</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="mb-3 row">
                <label for="" class="col-sm-4 col-form-label">
                  sort by
                </label>
                <div class="col-sm-8">
                  <select
                    class="form-select"
                    aria-label="Default select"
                    value={sortBy}
                    onChange={(e) => handleChangeSortBy(e)}
                  >
                    <option selected>most helpful</option>
                    <option value="desc_rating">
                      Highest to Lowest Rating
                    </option>
                    <option value="asc_rating">Lowest to Highest Rating</option>
                    <option value="recent">Most Recent</option>
                    <option value="older">Oldest</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="mb-3 row">
                <label for="" class="col-sm-4 col-form-label">
                  show
                </label>
                <div class="col-sm-8">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={showBy}
                    onChange={(e) => handleChangeShowBy(e)}
                  >
                    <option value="4" selected>
                      4
                    </option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {aLLReview.length > 0 &&
                aLLReview.map((userReview) => {
                  return (
                    <div class="single-review">
                      <ul class="nav rate-nav">
                        <StyledRating
                          name="simple-controlled"
                          value={userReview.rating}
                          size="small"
                          readOnly
                        />
                      </ul>
                      <div class="purchaser-name-flex">
                        <h3 class="user-name">{userReview.user_name}</h3>
                        <div class="verified">
                          <i class="fa-regular fa-circle-check"></i>
                          verified purchase
                        </div>
                      </div>
                      <div class="review-date">{userReview.time}</div>
                      <div class="review-data">
                        <p>{userReview.comment}</p>
                        <ul class="nav">
                          <li class="nav-item">
                            <a class="nav-link disabled">helpful?</a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              onClick={(event) =>
                                handleVoteReview(event, {
                                  id: userReview.id,
                                  vote: "yes",
                                })
                              }
                            >
                              yes . {userReview.like}
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              onClick={(event) =>
                                handleVoteReview(event, {
                                  id: userReview.id,
                                  vote: "no",
                                })
                              }
                            >
                              no . {userReview.dislike}
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">
                              report
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}

              {/* <div class="single-review seller-single-review">
                <div class="purchaser-name-flex">
                  <h3 class="user-name">wholesale club</h3>
                  <div class="verified">
                    <i class="fa-regular fa-circle-check"></i>
                    verified Seller
                  </div>
                </div>
                <div class="review-date">4 month ago</div>
                <div class="review-data">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum aliquid nulla illum nobis quae, qui magnam mollitia
                    deleniti illo, eveniet modi. Mollitia nobis inventore odit
                    ad sequi officiis, tempore ea!
                  </p>

                  <ul class="nav d-none">
                    <li class="nav-item">
                      <a class="nav-link disabled">helpful?</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        yes . 100
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        no . 20
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        report
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRatingTemplate;
