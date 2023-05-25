import React, { useEffect, useState } from "react";

const OrderDetails = ({ data, purchaseHistoryItems }) => {
  console.log(JSON.stringify(data) + "purchaseHistoryItems");
  const [subTotal, setSubTotal] = useState(0);
  const [estimatedSaving, setEstimatedSaving] = useState(0);
  var subTotalCal = function (items) {
    let product = items.filter((item) => {
      return item?.promotion_code == "";
    });
    let product_total = product.reduce((sum, item) => {
      return (
        sum +
        parseFloat(item.current_mrp.replace(/,/g, "")) *
          parseFloat(item.quantity)
      );
    }, 0);

    let package_product = items.filter((item) => {
      return item?.promotion_type == "package";
    });

    let package_total = package_product.reduce((sum, item) => {
      return (
        sum +
        parseFloat(item.current_mrp.replace(/,/g, "")) *
          parseFloat(item.quantity)
      );
    }, 0);
    setSubTotal(parseFloat(product_total) + parseFloat(package_total));
  };
  useEffect(() => {
    let totalDiscount = 0;
    purchaseHistoryItems.forEach((item) => {
      let discount =
        parseFloat(item?.membership_discount ?? 0) +
        parseFloat(item?.coupon_discount ?? 0) +
        parseFloat(item?.deal_offer_amount ?? 0) +
        parseFloat(item?.peak_of_peak_dis ?? 0);
      let package_discount = item?.package_discount;
      if (item?.promotion_type == "package") {
        totalDiscount += (parseFloat(package_discount.replace(/,/g, "")) ?? 0) * parseFloat(item.quantity);
      } else {
        totalDiscount += discount * parseFloat(item.quantity);
      }
    });
    setEstimatedSaving(totalDiscount);
    subTotalCal(purchaseHistoryItems);
  });
  console.log({ purchaseHistoryItems }, "dds");
  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">order summary</legend>

              <div class="table-responsive order-summary">
                <table class="table key-person mb-0">
                  <tbody>
                    <tr>
                      <th>Order Code</th>
                      <td>{data.code}</td>
                      <th>Order Date</th>
                      <td>
                        {data.date}
                        {/* <span>11:42 AM</span> */}
                      </td>
                    </tr>
                    <tr>
                      <th>Customer</th>
                      <td>{data?.shipping_address?.name}</td>
                      <th>Order Status</th>
                      <td>{data.payment_status}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{data?.shipping_address?.email}</td>
                      <th>Total Order Amount</th>
                      <td>&#2547; {data.grand_total}</td>
                    </tr>
                    <tr>
                      <th>Shipping Address</th>
                      <td>{data?.shipping_address?.address}</td>
                      <th>Shipping Method:</th>
                      <td>{data.shipping_type}</td>
                    </tr>
                    <tr>
                      <th>Payment Method</th>
                      <td>{data.payment_type}</td>
                      {/* <th>Additional Info</th>
                      <td>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam, non. Temporibus dicta aliquid illo eligendi
                        accusantium nihil mollitia debitis voluptatem!
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div class="common-fieldset-main">
                <fieldset class="common-fieldset">
                  <legend class="rounded">order details</legend>

                  <div class="table-responsive order-details">
                    <table class="table key-person mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Products</th>
                          <th scope="col">Variation</th>
                          {/*<th scope="col">Delivery type</th>*/}
                          <th scope="col">Regular Price</th>
                          <th>Discount</th>
                          <th scope="col">Price</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseHistoryItems?.map(
                          (
                            {
                              id,
                              product_id,
                              product_name,
                              variation,
                              quantity,
                              price,
                              delivery_status_string,
                              promotion_name,
                              current_mrp,
                              coupon_discount,
                              deal_offer_amount,
                              peak_of_peak_dis,
                              membership_discount,
                              promotion_type,
                              package_discount,
                            },
                            index
                          ) => {
                            let member_dis =
                              membership_discount == null
                                ? 0
                                : membership_discount;
                            let discount =
                              parseFloat(member_dis) +
                              parseFloat(coupon_discount) +
                              parseFloat(deal_offer_amount) +
                              parseFloat(peak_of_peak_dis);
                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{product_name || promotion_name}</td>
                                <td>{variation ?? "N/A"}</td>
                                {/*<td>{data?.payment_type}</td>*/}
                                <td>
                                  &#2547;{" "}
                                  {promotion_type != undefined &&
                                  promotion_type == "package"
                                    ? parseFloat(
                                        current_mrp.replace(/,/g, "")
                                      ) +
                                      parseFloat(
                                        package_discount.replace(/,/g, "")
                                      )
                                    : parseFloat(
                                        current_mrp.replace(/,/g, "")
                                      ) + discount}
                                </td>{" "}
                                <td>
                                  {" "}
                                  &#2547;{" "}
                                  {promotion_type != undefined &&
                                  promotion_type == "package"
                                    ? package_discount
                                    : discount}
                                </td>
                                <td>
                                  &#2547;{" "}
                                  {promotion_type != undefined &&
                                  promotion_type == "package"
                                    ? parseFloat(current_mrp.replace(/,/g, ""))
                                    : parseFloat(current_mrp.replace(/,/g, ""))}
                                </td>
                                <td>{quantity}</td>
                                <td>&#2547; {price}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
              <div class="common-fieldset-main">
                <fieldset class="common-fieldset">
                  <legend class="rounded">order amount</legend>

                  <div class="table-responsive order-amount">
                    <table class="table key-person mb-0">
                      <tbody>
                        <tr>
                          <th>Subtotal</th>
                          <td>&#2547; {subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>
                            &#2547; {parseFloat(data?.shipping_cost).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>VAT</th>
                          <td>
                            &#2547;{" "}
                            {parseFloat(data?.tax?.replace(/,/g, "")).toFixed(
                              2
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Coupon</th>
                          <td>
                            &#2547;{" "}
                            {parseFloat(data?.coupon_discount).toFixed(2)}
                          </td>
                        </tr>

                        <tr>
                          <th>Total</th>
                          <td>&#2547; {data?.grand_total}</td>
                        </tr>
                        <tr>
                          <th>Estimated Savings</th>
                          <td>
                            &#2547; {parseFloat(estimatedSaving).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetails;
