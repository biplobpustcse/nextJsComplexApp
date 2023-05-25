import React from "react";
import Link from "next/link";

const Dashboard = ({ data }) => {
  console.log({ data });
  const findDefaultAddress = data[0]?.data.find(
    (item) => item.set_default == 1
  );
  const unpaidOrders = data[1].filter(
    (item) => item.payment_status_string == "Unpaid"
  );
  let sum = 0;
  data[1].forEach((element) => {
    sum += element.amount;
  });

  return (
    <>
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
        <div class="order-information-main dashboard">
          <form action="" class="">
            <div class="common-fieldset-main">
              <fieldset class="common-fieldset">
                <legend class="rounded">dashboard</legend>

                <div class="dashboard-card-wrapper">
                  <div class="row g-3 align-items-center">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                      <div class="bg-grad-1 text-white rounded-lg overflow-hidden dashboard-card d-flex justify-content-between align-items-center">
                        <div class="px-3">
                          <h3 class="">{data[2]} Orders</h3>
                          <div class="opacity-50">in your cart</div>
                        </div>
                        <div class="dashboard-card-icon-wrapper">
                          <i class="fa-solid fa-cart-shopping dashboard-card-icon"></i>
                          <Link href="/purchaseHistory">
                            <a href>
                              View More
                              <i class="fa-solid fa-arrow-right-long"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                      <div class="bg-grad-2 text-white rounded-lg overflow-hidden dashboard-card d-flex justify-content-between align-items-center">
                        <div class="px-3">
                          <div class="h3 fw-700">
                            {data[3]} Unpaid Orders
                          </div>
                          <div class="opacity-50">in your cart</div>
                        </div>
                        <div class="dashboard-card-icon-wrapper">
                          <i class="fa-solid fa-cart-shopping dashboard-card-icon"></i>
                          <Link href={"/purchaseHistory"}>
                            <a href>
                              View More
                              <i class="fa-solid fa-arrow-right-long"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                      <div class="bg-grad-3 text-white rounded-lg overflow-hidden dashboard-card d-flex justify-content-between align-items-center">
                        <div class="px-3">
                          <div class="h3 fw-700">
                            Total Amount <br />
                            {sum}{" "}
                          </div>
                          <div class="opacity-50">in your cart</div>
                        </div>
                        <div class="dashboard-card-icon-wrapper">
                          <i class="fa-solid fa-cart-shopping dashboard-card-icon"></i>
                          <a href="#">
                            View More
                            <i class="fa-solid fa-arrow-right-long"></i>
                          </a>
                        </div>
                        {/* <!-- <svg xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 1440 320">
                                                                            <path fill="rgba(255,255,255,0.3)"
                                                                                fill-opacity="1"
                                                                                d="M0,192L30,208C60,224,120,256,180,245.3C240,235,300,181,360,144C420,107,480,85,540,96C600,107,660,149,720,154.7C780,160,840,128,900,117.3C960,107,1020,117,1080,112C1140,107,1200,85,1260,74.7C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
                                                                            </path>
                                                                        </svg> --> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dashboard-address-card-wrapper">
                  <div class="row g-3 align-items-center">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                      <div class="card address-card">
                        <div class="card-header">
                          <h6 class="mb-0">Default Shipping Address</h6>
                        </div>
                        <div class="card-body">
                          {findDefaultAddress != undefined && (
                            <ul class="list-unstyled mb-0">
                              {" "}
                              {/* <li class="py-2">
                                <span>Country : Bangladesh</span>
                              </li>{" "} */}
                              <li class="py-2">
                                <span>
                                  District : {findDefaultAddress?.District}
                                </span>
                              </li>{" "}
                              <li className="py-2">
                                <span>
                                  Division : {findDefaultAddress?.Division}
                                </span>
                              </li>
                              <li className="py-2">
                                <span>
                                  Upazilla : {findDefaultAddress?.Upazilla}
                                </span>
                              </li>{" "}
                              <li className="py-2">
                                <span>
                                  Area :{" "}
                                  {findDefaultAddress?.AreaDeliveryCharge}
                                </span>
                              </li>{" "}
                              <li class="py-2">
                                <span>
                                  Postal code :{" "}
                                  {findDefaultAddress?.postal_code}
                                </span>
                              </li>
                              <li class="py-2">
                                <span>
                                  Address : {findDefaultAddress?.address}
                                </span>
                              </li>
                              <li class="py-2">
                                <span>Phone : {findDefaultAddress?.phone}</span>
                              </li>
                            </ul>
                          )}
                          {findDefaultAddress == undefined && (
                            <p>Doesn't have any selected Default Address</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
