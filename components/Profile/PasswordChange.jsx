import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import {
  emptyPasswordMsg,
  passwordLengthValidMsg,
  passWordNotMatched,
} from "../../utils/dictionaries";
import { profileUpdate } from "../lib/endpoints";

const PasswordChange = () => {
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [clicked, setClicked] = useState(false);
  //phone state
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneFormated, setPhoneFormated] = useState(false);
  //oldpassword state
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordTouched, setOldPasswordTouched] = useState(false);
  const [oldPasswordIsValid, setOldPasswordIsValid] = useState(false);
  //password state
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  //confirmPassword state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmIsValid, setConfirmIsValid] = useState(false);

  const passwordChangeHandler = ({ target }) => {
    setPassword(target.value);
  };
  const passwordIsTouched = () => {
    setPasswordTouched(true);
  };
  const oldPasswordChangeHandler = ({ target }) => {
    setOldPassword(target.value);
  };
  const oldPasswordIsTouched = () => {
    setOldPasswordTouched(true);
  };
  const cpasswordChangeHandler = ({ target }) => {
    setConfirmPassword(target.value);
    if (password == target.value) {
      setConfirmIsValid(false);
    } else setConfirmIsValid(true);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    setClicked(true);
    if (
      password.length >= 6 &&
      oldPassword.length > 0 &&
      password == confirmPassword
    ) {
      http.post({
        url: profileUpdate,
        payload: {
          id: ctxAuth.user.user.id,
          name: ctxAuth.user.user.name,
          password: password,
          confirm_password: confirmPassword,
          old_password: oldPassword,
        },
        before: () => {},
        successed: () => {
          toast.success("Updated Successfully.");
          setOldPasswordIsValid(false);
          setPasswordIsValid(false);
          setOldPasswordTouched(false);
          setPasswordTouched(false);
          setOldPassword("");
          setPassword("");
          setConfirmPassword("");
        },
        failed: () => {},
      });
    }
  };
  //validation effectRules
  useEffect(() => {
    if (clicked) {
      if (
        (password.length == 0 && passwordTouched) ||
        (password.length == 0 && !passwordTouched)
      ) {
        setPasswordIsValid(true);
      } else setPasswordIsValid(false);
      if (
        (oldPassword.length == 0 && oldPasswordTouched) ||
        (oldPassword.length == 0 && !oldPasswordTouched)
      ) {
        setOldPasswordIsValid(true);
      } else setOldPasswordIsValid(false);
    }
  }, [
    clicked,
    phoneTouched,
    phone.length,
    passwordTouched,
    password.length,
    oldPassword.length,
    oldPasswordTouched,
  ]);

  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">change password</legend>
              <div class="row g-3 align-items-center">
                <div class="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                  <label for="" class="col-form-label">
                    old password :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xxl-9">
                  <input
                    type="text"
                    name=""
                    class="form-control"
                    placeholder="Please Enter old password"
                    value={oldPassword}
                    onChange={oldPasswordChangeHandler}
                    onBlur={oldPasswordIsTouched}
                  />
                  {oldPasswordIsValid && (
                    <div className="form-alert-msg">{emptyPasswordMsg}</div>
                  )}
                  {oldPassword.length == 0 &&
                    oldPasswordTouched &&
                    !oldPasswordIsValid && (
                      <div className="form-alert-msg">{emptyPasswordMsg}</div>
                    )}
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                  <label for="" class="col-form-label">
                    new password :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xxl-9">
                  <input
                    type="text"
                    name=""
                    class="form-control"
                    placeholder="Please Enter new password"
                    value={password}
                    onChange={passwordChangeHandler}
                    onBlur={passwordIsTouched}
                  />
                  {passwordIsValid && (
                    <div className="form-alert-msg">{emptyPasswordMsg}</div>
                  )}
                  {password.length == 0 &&
                    passwordTouched &&
                    !passwordIsValid && (
                      <div className="form-alert-msg">{emptyPasswordMsg}</div>
                    )}
                  {passwordTouched &&
                    password.length < 6 &&
                    password.length > 0 && (
                      <div className="form-alert-msg">
                        {passwordLengthValidMsg}
                      </div>
                    )}
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                  <label for="" class="col-form-label">
                    confirm password :<sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xxl-9">
                  <input
                    type="text"
                    name=""
                    class="form-control"
                    placeholder="Please Enter confirm password"
                    value={confirmPassword}
                    onChange={cpasswordChangeHandler}
                  />
                  {confirmIsValid && (
                    <div className="form-alert-msg">{passWordNotMatched}</div>
                  )}
                </div>
              </div>

              <div class="w-100 text-end">
                <button
                  type="submit"
                  class="btn profile-update-btn"
                  onClick={submitHandler}
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

export default PasswordChange;
