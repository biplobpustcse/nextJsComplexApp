import React from 'react';

const Banner = ({ banner, col }) => {
  return (
    <>
      <section className="advertise-main ">
        <div className="container-fluid">
          <div className="row">
            {banner &&
              banner?.map((item, index) => {
                return (
                  <div className={col}>
                    <div className="advertise-image-box ss">
                      <img src={item} alt="" className="img-fluid" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
