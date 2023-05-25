import React from "react";
import SecondFooter2 from "../../../components/Footer/SecondFooter2";
import SslFooter2 from "../../../components/Footer/SslFooter2";
import {SecondFooter} from "../../../components/Footer/SecondFooter";

function index() {
  return (
    <>
      <section class="job-apply-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="common-gap">
                <div class="subtitle">
                  <span>job application form</span>
                </div>
                <div class="main-title">
                  <h2>Data Entry Cum Product Analyst</h2>
                </div>
                <form action="">
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      <legend class="rounded"> personal information</legend>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Your Name <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter your name"
                            />
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              email <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              placeholder="Pleae enter your email address"
                            />
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              phone number <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter phone number"
                            />
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              university <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter university"
                            />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      <legend class="rounded"> My experience</legend>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              total year of experiances{" "}
                              <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter total year of experiances"
                            />
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Expertise/Interest Areas{" "}
                              <sup class="text-danger">*</sup>
                            </label>

                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter your Expertise/Interest Areas"
                              id=""
                            ></input>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              notice period <sup class="text-danger">*</sup>
                            </label>
                            <select name="" class="form-select" id="">
                              <option value="">Immedietly</option>
                              <option value="">15 Days</option>
                              <option value="">1 Months</option>
                              <option value="">1 Months +</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              current salary <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter your current salary"
                            />
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              expected salary <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Pleae enter your expected salary"
                            />
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <label for="" class="form-label">
                            cover letter <sup class="text-danger">*</sup>
                          </label>
                          <textarea
                            class="form-control"
                            placeholder="cover letter"
                            id=""
                          ></textarea>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <label for="" class="form-label">
                            Resume <sup class="text-danger">*</sup>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            placeholder=""
                          />
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                          <button class="btn apply-online-btn ">submit</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default index;
