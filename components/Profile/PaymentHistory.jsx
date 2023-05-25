import React, {useCallback, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {http} from "../../services/httpService";
import {paymentHis} from "../lib/endpoints";

const PaymentHistory = ({ data }) => {
  const [paymentData, setPaymentData] = useState(data);
  const [pageNo, setPageNo] = useState(1);
  const hasMoreDataHandler = useCallback(() => {
    setPageNo(pageNo + 1);
    http.get({
      url: paymentHis + `?page=` + (pageNo + 1),
      before: () => {},
      successed: (res) => {
        console.log({ res });
        const mergableData = [...paymentData, ...res];
        setPaymentData(mergableData);
      },
      failed: () => {},
    });
  });
  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">payment history</legend>


              <InfiniteScroll
                  dataLength={paymentData.length}
                  next={hasMoreDataHandler}
                  hasMore={true}
                  endMessage={<p>End Of Data</p>}
              >
              <div class="table-responsive">
                <table class="table table-bordered table-striped payment-history">
                  <thead>
                    <tr>
                      <th scope="col">Sl No.</th>
                      <th scope="col">date</th>
                      <th scope="col">invoice No</th>
                      <th scope="col">order no.</th>
                      <th scope="col">type</th>
                      <th scope="col">amount</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr>
                        <th scope="row" class="text-center">
                          {index + 1}
                        </th>
                        <td class="text-center">{item.date}</td>
                        <td>{item.invoice_no}</td>
                        <td>{item.order_no}</td>
                        <td>{item.payment_type}</td>
                        <td>{item.amount}</td>
                        <td>{item.payment_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </InfiniteScroll>

            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentHistory;
