import router from "next/router";
import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <section className="error-page-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="error-bg">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="content">
                        <span className="title-highlighter">
                          <i class="icofont-info-circle"></i>
                          Oops! Somthing's missing.
                        </span>
                        <h1 class="title">Something Went Wrong.</h1>
                        <p>
                          It seems like we dont find what you searched. The page
                          you were looking for doesn't exist, isn't available
                          loading incorrectly.
                        </p>
                        <Link href={'/'} as={'/'} >
                          <a
                              className="axil-btn right-icon"
                          >
                            Back To Home <i className="icofont-arrow-right"></i>
                          </a>

                        </Link>

                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <img
                        src="/assets/images/404.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Custom404;
