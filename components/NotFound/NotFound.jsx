import React from 'react'

export default function NotFound() {
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
                        <h1 class="title">Product Not Found</h1>
                        <p>
                          It seems like we don't find what you searched. The product
                          you were looking for isn't available.
                        </p>
                        <a
                          href=""
                          onClick={() => {
                            router.push("/");
                            window.reload();
                          }}
                          class="axil-btn right-icon"
                        >
                          Back To Home <i class="icofont-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <img
                        src="/assets/images/not-found.png"
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
  )
}
