import React from 'react';

const Advertisement = () => {
  return (
    <section className="advertise-main d-none">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 px-0">
            <div className="advertise-image-box">
              <a href="#" target="_blank">
                <img
                  src="/assets/images/products/adv.png"
                  alt=""
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
