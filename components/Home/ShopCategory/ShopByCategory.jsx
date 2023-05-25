import React from 'react';
import ShopByCatTemplate from './ShopCatTemplate';
import Link from 'next/link';

const ShopByCategory = ({ section,Template, data, headerText, url = null ,childUrl}) => {
  const btnText = (url) => {
    if (url == 'all-category') {
      return 'View all Category';
    } else {
      return 'View All';
    }
  };

  return (
    <section class="shop-category-main mb-ten">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="common-fieldset-main">
              <fieldset class="common-fieldset">
                <legend class="rounded">{headerText}</legend>
                <div class="row">
                  <Template data={data} url={childUrl} section={section} />
                  <div className="col-12 text-center">
                    <Link href={url}>
                      <a className="btn view-all-product-btn">{btnText(url)}</a>
                    </Link>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
