import React from "react";

const CommonHeader = ({ text }) => {
  return (
    <section class="userprofile-banner">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="banner-bg">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <h4>{text}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonHeader;
