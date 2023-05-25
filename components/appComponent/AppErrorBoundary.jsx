import router from "next/router";
import React, { Fragment } from "react";
import Link from "next/link";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error }, { errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
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
                            It seems like we dont find what you searched. The
                            page you were looking for doesn't exist, isn't
                            available loading incorrectly.
                          </p>
                          <Link href={'/'} as={'/'}>
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
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
