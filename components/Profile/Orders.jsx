import React from "react";

const Orders = () => {
  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">
                <i class="icofont-cart me-1"></i>
                my orders
              </legend>
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr class="">
                      <td>sl no.</td>
                      <td>Order ID</td>
                      <td class="text-center">Order date</td>
                      <td class="text-center">Price</td>
                      <td class="text-center">Status</td>
                      <td class="text-center">Details</td>
                    </tr>
                    <tr>
                      <td class="">1</td>
                      <td class="">00000139</td>

                      <td class="text-center">04-09-2022, 11:26AM</td>
                      <td class="">2619.00 tk</td>
                      <td class="text-center">
                        <span class="pending">Pending</span>
                      </td>
                      <td class="text-center">
                        <a href="#" class="">
                          View Order
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="">2</td>
                      <td class="">00000140</td>

                      <td class="text-center">04-09-2022, 11:26AM</td>
                      <td class="">2619.00 tk</td>
                      <td class="text-center">
                        <span class="confirmed">confirmed</span>
                      </td>
                      <td class="text-center">
                        <a href="#" class="">
                          View Order
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="">3</td>
                      <td class="">00000140</td>

                      <td class="text-center">04-09-2022, 11:26AM</td>
                      <td class="">2619.00 tk</td>
                      <td class="text-center">
                        <span class="cancel">cancel</span>
                      </td>
                      <td class="text-center">
                        <a href="#" class="">
                          View Order
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Orders;
