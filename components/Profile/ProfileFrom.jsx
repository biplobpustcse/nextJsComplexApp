import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import { getCitys, profileUpdate } from "../lib/endpoints";

const ProfileFrom = () => {
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [userName, setUserName] = useState(ctxAuth.user?.user?.name);
  const [nameIsValid, setNameIsValid] = useState(false);
  const dispatch = useDispatch();
  const nameChangeHandler = ({ target }) => {
    setUserName(target.value);
  };
  const updateHandler = (evt) => {
    evt.preventDefault();
    if (userName.length > 0) {
      http.post({
        url: profileUpdate,
        payload: {
          id: ctxAuth.user.user.id,
          name: userName,
        },
        before: () => {},
        successed: (res) => {
          console.log(res,'prf')
          dispatch({ type: "PROFILE_NAME_UPDATE", payload: userName });

          toast.success("Updated Successfully.");
        },
        failed: () => {},
      });
    } else {
      setNameIsValid(true);
    }
  };
  useEffect(() => {
    if (ctxAuth) {
      setUserName(ctxAuth.user?.user?.name);
    }
  }, [ctxAuth]);

  console.log({ ctxAuth });
  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">personal information</legend>
              <div class="row g-3 align-items-center">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <label for="" class="col-form-label">
                    Name :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  <input
                    type="text"
                    name="first_name"
                    value={userName}
                    class="form-control"
                    placeholder="Please Enter Name"
                    onChange={nameChangeHandler}
                  />
                </div>
              </div>
              {/* <div class="row g-3 align-items-center">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <label for="" class="col-form-label">
                    Last Name :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  <input
                    type="text"
                    name="last_name"
                    value="Hosen"
                    class="form-control"
                    placeholder="Please Enter Last Name"
                  />
                </div>
              </div> */}
              <div class="row g-3 align-items-center">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <label for="" class="col-form-label">
                    Phone :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  <input
                    type="text"
                    name="phone"
                    readonly=""
                    value={ctxAuth.user?.user?.phone}
                    class="form-control"
                    placeholder="Please Enter Your phone"
                  />
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <label for="" class="col-form-label">
                    e-mail :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  <input
                    type="email"
                    name="email"
                    value={ctxAuth.user?.user?.email}
                    class="form-control"
                    placeholder="Please Enter Your email"
                    readonly=""
                  />
                </div>
              </div>
              {/* <div class="row g-3 align-items-center">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <label for="" class="col-form-label">
                    Mobile No :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  <input
                    type="text"
                    name="phone"
                    value="01772594700"
                    class="form-control"
                    placeholder="Please Enter Your Phone No"
                  />
                </div>
              </div> */}
              <div class="w-100 text-end">
                <button
                  type="submit"
                  class="btn profile-update-btn"
                  onClick={updateHandler}
                >
                  Update
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileFrom;
