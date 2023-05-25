import React from "react";

const SupplierSlider = ({supplierData}) => {
  return (
    <section class="supplier-reg-banner">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="supplier-banner" style={{backgroundImage: `url(${supplierData?.banner})`, backgroundRepeat: 'no-repeat'}}>
              {/* <img src={supplierData?.banner} alt=""/> */}
              <h4>{supplierData?.title}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierSlider;
