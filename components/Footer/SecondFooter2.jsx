import React from 'react';
import Link from 'next/link';
import FooterComponent from "./FooterComponent";

function SecondFooter2() {
  return (
    <footer class="second-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="newshape-bg">
              <div class="row">
                <FooterComponent />


                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-4">
                  <h4 class="second-footer-title"> contacts</h4>
                  <p class="part">
                    Jamuna future park, level #Minus Two (-2), Ka-244, Progati
                    Sarani, Kuril, Baridhara, Dhaka-1229.
                  </p>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a class="nav-link " href="#">
                        <i class="icofont-phone"></i> 09611996677
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        <i class="icofont-envelope"></i>{' '}
                        info@wholesaleclublt.com
                      </a>
                    </li>
                  </ul>
                  <ul class="nav social-nav">
                    <li class="nav-item">
                      <a class="nav-link " href="#">
                        <i class="icofont-facebook"></i>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        <i class="icofont-instagram"></i>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        <i class="icofont-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 d-none">
                  <h5 class="download-app-title">
                    download wholesale club mobile app
                  </h5>
                  <p class="part">
                    Be a part of our Wholesale Club. Send the link via sms to
                    install the app
                  </p>
                  <div class="phone-box">
                    <div class="input-box">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="01XXX-XXXXXX"
                      />
                    </div>
                    <div class="plan-box">
                      <button type="submit" class="btn plain-btn">
                        <i class="icofont-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                  <div class="download-app-icon">
                    <div>
                      <img
                        src="../assets/images/icon/android-logo.png"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                    <div>
                      <img
                        src="../assets/images/icon/apple.png"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SecondFooter2;
