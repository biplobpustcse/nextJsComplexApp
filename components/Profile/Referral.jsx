import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl, http } from "../../services/httpService";
import {
  logsOfUserData,
  postWisthDraw,
  referralStats,
  withdrawHistory,
} from "../lib/endpoints";

const Referral = ({ data }) => {
  const [stats, setStats] = useState(data[1]);
  const [logsOfUser, setLogsOfUser] = useState(data[2]);
  const [withdrawHis, setWithdrawHis] = useState(data[0]);
  const [withDrawValue, setWithdrawValue] = useState("");
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [isCopy, setIsCopy] = useState(false);

  const withDrawValueChangeHandler = ({ target }) => {
    setWithdrawValue(target.value);
  };
  const saveHandler = () => {
    http.post({
      url: postWisthDraw,
      payload: {
        amount: withDrawValue,
      },
      before: () => { },
      successed: () => {
        toast.success("Successfully Updated.");
      },
      failed: () => { },
    });
  };
  const copyHandler = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(
      baseUrl + `?referral_code=` + ctxAuth.user.user?.referral_code
    );
  };
  // const getStatsReferall = useCallback(() => {
  //   http.get({
  //     url: referralStats,
  //     before: () => {},
  //     successed: (res) => {
  //       setStats(res);
  //     },
  //     failed: () => {},
  //   });
  // }, []);
  // const getLogsHistory = useCallback(() => {
  //   http.get({
  //     url: logsOfUserData,
  //     before: () => {},
  //     successed: (res) => {
  //       setLogsOfUser(res);
  //     },
  //     failed: () => {},
  //   });
  // }, []);
  // const getLogHis = useCallback(() => {
  //   http.get({
  //     url: withdrawHistory,
  //     before: () => {},
  //     successed: (res) => {
  //       setWithdrawHis(res);
  //     },
  //     failed: () => {},
  //   });
  // }, []);
  // useEffect(() => {
  //   if (ctxAuth.isLoggedIn) {
  //     getStatsReferall();
  //     getLogsHistory();
  //     getLogHis();
  //   }
  // }, [ctxAuth]);
  useEffect(() => {
    if (isCopy) {
      setTimeout(() => [setIsCopy(false)], [3000]);
    }
  }, [isCopy]);
  return (
    <>
      {/* <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8"> */}
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
        <div class="order-information-main">
          <form action="" class="">
            <div class="common-fieldset-main">
              <fieldset class="common-fieldset">
                <legend class="rounded">referral</legend>
                <div class="row g-3 align-items-center">
                  <div class="referral-card-col col-xs-12 col-sm-12 col-md-4 col-lg-4 mx-auto">
                    <div class="card affiliate-card">
                      <div class="card-icon">
                        <i class="fa-solid fa-dollar-sign"></i>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">
                          <strong>{withdrawHis[0]?.amount}</strong>
                        </h5>
                        <p class="card-text">Affiliate Balance</p>
                      </div>
                    </div>
                  </div>
                  <div class="referral-card-col col-xs-12 col-sm-12 col-md-4 col-lg-4 mx-auto">
                    <div class="card affiliate-card">
                      <div class="card-icon">
                        <i class="fa-solid fa-gear"></i>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">configure payout</h5>
                        {/* <!-- <p class="card-text">Affiliate Balance</p> --> */}
                      </div>
                    </div>
                  </div>
                  <div class="referral-card-col col-xs-12 col-sm-12 col-md-4 col-lg-4 mx-auto">
                    <div class="card affiliate-card">
                      <div
                        class="card-icon"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="fa-solid fa-plus"></i>{" "}
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">Affiliate Withdraw Request</h5>
                        {/* <!-- <p class="card-text">Affiliate Balance</p> --> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row g-3 align-items-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="referral-link-wrapper d-flex mb-3">
                      <input
                        class="form-control"
                        type="text"
                        value={
                          baseUrl +
                          `?referral_code=` +
                          ctxAuth.user.user?.referral_code
                        }
                        aria-label="Disabled input example"
                        disabled
                        readonly
                      />
                      <button
                        class="btn profile-update-btn"
                        type="button"
                        onClick={copyHandler}
                      >
                        {!isCopy && "Copy"}
                        {isCopy && "Copy done"}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row g-3 align-items-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                    <div className="common-fieldset-main">
                      <fieldset class="common-fieldset">
                        <legend class="rounded">Affiliate Stats</legend>
                        <div class="card affiliate-stats">

                          {/* ============== filter ============== */}

                          {/* <div class="card-head">
                            <form class="" id="" action="" method="GET">
                              <div class="row">
                                <div class="col text-start align-self-center">
                                  <h5 class="mb-md-0 h6">Affiliate Stats</h5>
                                </div>
                                <div class="col-md-5 col-xl-4">
                              <div class="input-group mb-0">
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>
                                    Open this select menu
                                  </option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                                <button
                                  class="btn profile-update-btn"
                                  type="button"
                                >
                                  Filter
                                </button>
                              </div>
                            </div>
                              </div>
                            </form>
                          </div> */}

                          {/* ============== filter ============== */}


                          <div class="card-body">
                            <div class="row">
                              <div class="stat-card-col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mx-auto">
                                <div class="stat-card">
                                  <h5 class="stat-card-number">
                                    {stats?.no_of_click ? stats?.no_of_click : 0}
                                  </h5>
                                  <p class="stat-card-title">No of click</p>
                                </div>
                              </div>
                              <div class="stat-card-col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mx-auto">
                                <div class="stat-card">
                                  <h5 class="stat-card-number">
                                    {stats?.no_of_order_item ? stats?.no_of_order_item : 0}
                                  </h5>
                                  <p class="stat-card-title">No of Order Item</p>
                                </div>
                              </div>
                              <div class="stat-card-col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mx-auto">
                                <div class="stat-card">
                                  <h5 class="stat-card-number">
                                    {stats?.no_of_delivered ? stats?.no_of_delivered : 0}
                                  </h5>
                                  <p class="stat-card-title">No of Delivered</p>
                                </div>
                              </div>
                              <div class="stat-card-col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mx-auto">
                                <div class="stat-card">
                                  <h5 class="stat-card-number">
                                    {stats?.no_of_cancel ? stats?.no_of_cancel : 0}
                                  </h5>
                                  <p class="stat-card-title">No of Cancle</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                  </div>
                </div>

                <div class="row g-3 align-items-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="common-fieldset-main">
                      <fieldset class="common-fieldset">
                      <legend class="rounded">Affiliate Earning History</legend>
                        <div class="card affiliate-stats">
                          {/* <div class="card-head">
                            <div class="col text-start align-self-center">
                              <h5 class="mb-md-0 h6">Affiliate Earning History</h5>
                            </div>
                          </div> */}
                          <div class="card-body overflow-auto">
                            <div className="table-responsive affiliate-history">
                              <table class="table table-bordered table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Referral User</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Referral Type</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Date</th>
                                  </tr>
                                </thead>
                                {/* <tbody>
                                  {logsOfUser.map((item, index) => (
                                    <tr>
                                      <td scope="row">{index + 1}</td>
                                      <td scope="row">{item?.reffered_to}</td>
                                      <td scope="row">{item?.amount}</td>
                                      <td scope="row">{item?.order_id}</td>
                                      <td scope="row">{item?.affiliate_type}</td>
                                      <td scope="row">{item?.product}</td>
                                      <td scope="row">{item?.date}</td>
                                    </tr>
                                  ))}
                                </tbody> */}
                              </table>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Affiliate Withdraw Request
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="text-center">
                <h3 className="text-danger text-center">Affiliate Withdraw Request</h3>
              </div>
              <input
                type="text"
                name=""
                id=""
                value={withDrawValue}
                onChange={withDrawValueChangeHandler}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={saveHandler}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referral;
