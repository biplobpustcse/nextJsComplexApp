import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../../../services/httpService";
import { postSubscribe } from "../../lib/endpoints";

const DownloadAppCorner = () => {
  const [email, setEmail] = useState("");
  const emailChangeHandler = ({ target }) => {
    setEmail(target.value);
  };
  const submitHandler = () => {
    if (email.length > 0) {
      http.post({
        url: postSubscribe,
        payload: {
          email: email,
        },
        before: () => {},
        successed: () => {
          toast.success("Subscribed Successfully");
        },
        failed: () => {},
      });
    }
  };
  return (
    <section class="download-app mt-ten">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="newshape-bg">
              <div class="row align-items-cente">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <div class="subscribe-bg">
                    <h2>download wholesale club</h2>
                    <h3>mobile app</h3>
                    <h5>
                      Be a part of our Wholesale Club. Send the link via sms to
                      install the app.
                    </h5>
                    <div class="phone-box">
                      <div class="input-box">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="01XXX-XXXXXX"
                        />
                      </div>
                      <div class="plan-box">
                        <button type="submit" class="btn plain-btn">
                          <i class="icofont-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="newsletter-main">
                    <form action="">
                      <div class="form-group">
                        <label for="" class="form-label">
                          get Email on savings events, special offers, new
                          items, in-club events and more.
                        </label>
                        <div class="newsletter-flex">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={emailChangeHandler}
                          />
                          <button class="btn go-btn" onClick={submitHandler}>
                            go
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="row align-items-center">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="mockup-box">
                        <img
                          src="/assets/images/icon/app.png"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="playstore-btn-wrapper">
                        <div class="playstore-box">
                          <a href="https://play.google.com/store/apps/details?id=com.wholesaleclubltd"
                          target="_"
                          
                          >
                            <img
                              src="/assets/images/icon/g-play.png"
                              alt=""
                              class="img-fluid"
                            />
                          </a>
                        </div>
                        <div class="playstore-box">
                          <a
                            href="https://apps.apple.com/app/wholesale-club/id6446449789"
                            target="_"
                          >
                            <img
                              src="/assets/images/icon/apple-play.png"
                              alt=""
                              class="img-fluid"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppCorner;
