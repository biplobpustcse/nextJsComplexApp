import React from "react";
import { SecondFooter } from "../Footer/SecondFooter";
import SecondFooter2 from "../Footer/SecondFooter2";
import { SslFooter } from "../Footer/SslFooter";
import SslFooter2 from "../Footer/SslFooter2";
import CommonHeader from "./CommonHeader";
import CommonSidebar from "./CommonSidebar";

const ProfileLayout = ({
  Template,
  HeaderTemplate,
  text,
  data,
  purchaseHistoryItems=null,
}) => {
  return (
    <>
      <HeaderTemplate text={text} />
      <section class="user-info-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="user-info-bg">
                <div class="row">
                  <CommonSidebar />
                  <Template
                    data={data}
                    purchaseHistoryItems={purchaseHistoryItems}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SecondFooter />
      <SslFooter2 />
    </>
  );
};

export default ProfileLayout;
