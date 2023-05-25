import React from 'react';

const SuccessOrder = () => {
  return (
    <div className='success-order'>
      <div className="common-fieldset-main mb-0">
        <fieldset className="common-fieldset">
          <legend className="rounded">order status</legend>
          <div className="order-status-flex">
            <div className="order-check">
              <img
                src="/assets/images/payment/accept.svg"
                class="check-img img-fluid"
              />
            </div>
            <div className="success">
              <h3>Your order placement is successfull</h3>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SuccessOrder;
