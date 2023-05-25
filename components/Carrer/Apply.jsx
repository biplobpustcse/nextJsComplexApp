import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import {getHomeSliders, getJobs, postJobs} from "../lib/endpoints";

import { API } from "../../config";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

//import axios from 'axios';
const axios = require("axios");

function JobOnlineApply({ id }) {
  const router  = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  // const [AlternatePhoneError, setAlternatePhoneError] = useState("");
  const [universityError, setUniversityError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [interestAreaError, setInterestAreaError] = useState("");
  const [noticePeriodError, setNoticePeriodError] = useState("");
  const [currentSalaryError, setCurrentSalaryError] = useState("");
  const [expectedSalaryError, setExpectedSalaryError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [JobSourceError, setJobSourceError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [coverLatterError, setCoverLatterError] = useState("");
  //file
  const [resumeError, setResumeError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [inputValues, setInputValue] = useState({
    job_id: 0,
    name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    gender : "",
    age: "",
    last_educational_qualification : "",
    job_source: "",
    job_title : "",
    image: "",
    university: "",
    experinece: "",
    interested_areas: "",
    notice_period: "",
    current_salary: "",
    expected_salary: "",
    //cover_latter:"",

    file_name: "",
  });
  const [inputTouched, setInputTouched] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    last_educational_qualification : "",
    job_source: "",
    job_title  : "",
    image: "",
    university: "",
    experinece: "",
    interested_areas: "",
    notice_period: "",
    current_salary: "",
    expected_salary: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    // debugger;
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }
  //file
  const changeFileHandler = (event,type) => {
    if (event.target.files.length > 0) {
      if(type == 'resume'){
        setInputValue({ ...inputValues, ["file_name"]: event.target.files[0] });
        // debugger;
      }
      if(type == 'photo'){
        setInputValue({ ...inputValues, ["image"]: event.target.files[0] });
        // debugger;
      }
    }
  };
  const validateSelectedFile = () => {
    const MIN_FILE_SIZE = 1024; // 1MB
    const MAX_FILE_SIZE = 5120; // 5MB

    if (!inputValues.file_name) {
      setResumeError("Please choose a file");
      setIsSuccess(false);
      return;
    }

    // const fileSizeKiloBytes = inputValues.file_name.size / 1024

    // if(fileSizeKiloBytes < MIN_FILE_SIZE){
    //   setResumeError("File size is less than minimum limit");
    //   setIsSuccess(false)
    //   return
    // }
    // if(fileSizeKiloBytes > MAX_FILE_SIZE){
    //   setResumeError("File size is greater than maximum limit");
    //   setIsSuccess(false)
    //   return
    // }

    setResumeError("");
  };

  function checkValidation() {
    let validatePass = true


    if(inputValues.image == '' ){
      setPhotoError('Photo is required')
      validatePass = false
    }else{
      setPhotoError('')
    }

    if(inputValues.gender == '' ){
      setGenderError('Gender is required')
      validatePass = false

    }else{
      setGenderError('')
    }
    if(inputValues.last_educational_qualification == '' ){
      setQualificationError('Qualification is required')
      validatePass = false

    }else{
      setQualificationError('')
    }



    if(inputValues.job_source == '' ){
      setJobSourceError('Job Source is required')
      validatePass = false

    }else{
      setJobSourceError('')
    }


    if(inputValues.age == '' ){
      setAgeError('Age is required')
      validatePass = false

    }else{
      setAgeError('')
    }
    if (
      (inputValues.name.length == 0 && inputTouched.name) ||
      (inputValues.name.length == 0 && !inputTouched.name)
    ) {
      setNameError("Name is required.");
      validatePass = false

    } else {
      setNameError("");
    }
    // email validation
    if (
      (inputValues.email.length == 0 && inputTouched.email) ||
      (inputValues.email.length == 0 && !inputTouched.email)
    ) {
      setEmailError("Email is required.");
      validatePass = false

    } else {
      setEmailError("");
    }
    //
    if (
      (inputValues.phone.length == 0 && inputTouched.phone) ||
      (inputValues.phone.length == 0 && !inputTouched.phone)
    ) {
      setPhoneError("Phone number is required.");
      validatePass = false

    } else {
      setPhoneError("");
    }
    // if (
    //   (inputValues.alternate_phone.length == 0 && inputTouched.alternate_phone) ||
    //   (inputValues.alternate_phone.length == 0 && !inputTouched.alternate_phone)
    // ) {
    //   setAlternatePhoneError("Phone number is required.");
    // } else {
    //   setAlternatePhoneError("");
    // }
    //
    if (
      (inputValues.university.length == 0 && inputTouched.university) ||
      (inputValues.university.length == 0 && !inputTouched.university)
    ) {
      setUniversityError("University is required.");
      validatePass = false

    } else {
      setUniversityError("");
    }
    //
    if (
      (inputValues.experinece.length == 0 && inputTouched.experinece) ||
      (inputValues.experinece.length == 0 && !inputTouched.experinece)
    ) {
      setExperienceError("Experinece is required.");
      validatePass = false

    } else {
      setExperienceError("");
    }
    //
    if (
      (inputValues.interested_areas.length == 0 &&
        inputTouched.interested_areas) ||
      (inputValues.interested_areas.length == 0 &&
        !inputTouched.interested_areas)
    ) {
      setInterestAreaError("Interested Areas is required.");
      validatePass = false

    } else {
      setInterestAreaError("");
    }
    //
    if (inputValues.notice_period == "") {
      setNoticePeriodError("Notice Period is required.");
      validatePass = false

    } else {
      setNoticePeriodError("");
    }
    //
    if (
      (inputValues.current_salary.length == 0 && inputTouched.current_salary) ||
      (inputValues.current_salary.length == 0 && !inputTouched.current_salary)
    ) {
      setCurrentSalaryError("Current Salary is required.");
      validatePass = false

    } else {
      setCurrentSalaryError("");
    }
    //
    if (
      (inputValues.expected_salary.length == 0 &&
        inputTouched.expected_salary) ||
      (inputValues.expected_salary.length == 0 && !inputTouched.expected_salary)
    ) {
      setExpectedSalaryError("Expected Salary is required.");
      validatePass = false

    } else {
      setExpectedSalaryError("");
    }
    //file error
    validateSelectedFile();
    return validatePass
  }
  useEffect(() => {
    if (!isSuccess) {
      checkValidation();
    }
  }, [inputValues, inputTouched]);

  function saveOnlineApplication(data) {
    http.file({
      url: postJobs,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setJobsData(res);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);

    if(checkValidation() == false) {
      return ;
    }


      http.file({
        url: postJobs,
        payload: {
          job_id: inputValues.job_id,
          email: inputValues.email,
          phone: inputValues.phone,
          university: inputValues.university,
          experinece: inputValues.experinece,
          interested_areas: inputValues.interested_areas,
          notice_period: inputValues.notice_period,
          current_salary: inputValues.current_salary,
          expected_salary: inputValues.expected_salary,
          file_name: inputValues.file_name,
          name: inputValues.name,
          image: inputValues.image,
          first_name: "",
          last_name: "",
          alternative_number: inputValues.alternate_phone,
          job_source: inputValues.job_source,
          last_educational_qualification: inputValues.last_educational_qualification,
          gender: inputValues.gender,
          age: inputValues.age,
        },
        before: () => {

        },
        successed: (res) => {
          // setJobsData(res);

          if(res.id != undefined){
            toast.success("Job Applied  successfully.");
            router.push("/");
          }else{
            toast.error(res.message);
          }
        },
        failed: () => {


        },
      });





    // if (
    //   nameError != "" ||
    //   emailError != "" ||
    //   phoneError != "" ||
    //   universityError != "" ||
    //   experienceError != "" ||
    //   interestAreaError != "" ||
    //   noticePeriodError != "" ||
    //   currentSalaryError != "" ||
    //   expectedSalaryError != "" ||
    //   resumeError != ""
    // ) {
    //   console.log("failed");
    //   setIsSuccess(false);
    //   return;
    // }
    // console.log("Success", expectedSalaryError);
    //
    // inputValues.job_id = id;
    // const formData = new FormData();
    // console.log("data", formData);
    // console.log(inputValues);
    // Object.keys(inputValues).map(function (key) {
    //   formData.append(key, inputValues[key]);
    // });

    // saveOnlineApplication(inputValues);

    // setInputValue({
    //   job_id: 0,
    //   name: "",
    //   email: "",
    //   phone: "",
    //   university: "",
    //   last_educational_qualification: "",
    //   job_title: "",
    //   job_source: "",
    //   image: "",
    //   experinece: "",
    //   interested_areas: "",
    //   notice_period: "",
    //   current_salary: "",
    //   expected_salary: "",
    //   //cover_latter:"",
    //
    //   file_name: "",
    // });
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  }


  useEffect(() => {
    console.log(router,'tot')
    http.get({
      url: getJobs + "?id="+ router.query.id,
      before: () => {
      },
      successed: (res) => {
        console.log(res[0],'tot')
        setInputValue({...inputValues,job_id: res[0].id,job_title: res[0].job_title});
      },
      failed: () => {

      },
    });
  },[])

  return (
    <section class="job-apply-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="common-gap">
              {/*<div class="subtitle">*/}
              {/*  <span>job application form</span>*/}
              {/*</div>*/}
              <div class="main-title">
                <h2>Job Application Form</h2>
              </div>
              <form
                action=""
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
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
                            placeholder="please enter your name"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="name"
                            value={inputValues.name}
                          />
                          {nameError != "" && !clicked && inputTouched.name && (
                            <div style={{ color: "red" }}>{nameError}</div>
                          )}
                          {nameError != "" && clicked && (
                            <div style={{ color: "red" }}>{nameError}</div>
                          )}
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
                            placeholder="please enter your  email address"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="email"
                            //onBlur={handleTouched}
                            // onChange={nameChangeHandler}
                            // onBlur={nameIsTouchedHandler}
                            value={inputValues.email}
                            //value={name}
                            // onChange={(e)=>{setName(e.target.value)}}
                          />
                          {emailError != "" &&
                            !clicked &&
                            inputTouched.email && (
                              <div style={{ color: "red" }}>{emailError}</div>
                            )}
                          {emailError != "" && clicked && (
                            <div style={{ color: "red" }}>{emailError}</div>
                          )}
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
                            placeholder="please enter phone number"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="phone"
                            value={inputValues.phone}
                          />
                          {phoneError != "" &&
                            !clicked &&
                            inputTouched.phone && (
                              <div style={{ color: "red" }}>{phoneError}</div>
                            )}
                          {phoneError != "" && clicked && (
                            <div style={{ color: "red" }}>{phoneError}</div>
                          )}
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="form-group">
                          <label for="" class="form-label">
                            Alternate phone number <sup class="text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="please enter phone number"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="alternate_phone"
                            value={inputValues.alternate_phone}
                          />
                          {/*{phoneError != "" &&*/}
                          {/*  !clicked &&*/}
                          {/*  inputTouched.alternate_phone && (*/}
                          {/*    <div style={{ color: "red" }}>{AlternatePhoneError}</div>*/}
                          {/*  )}*/}
                          {/*{phoneError != "" && clicked && (*/}
                          {/*  <div style={{ color: "red" }}>{AlternatePhoneError}</div>*/}
                          {/*)}*/}
                        </div>
                      </div>


                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="" className="form-label">
                            Gender <sup className="text-danger">*</sup>
                          </label>
                          <select
                              className="form-select"
                              id=""
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="gender"
                              value={inputValues.gender}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {genderError != "" &&
                          !clicked &&
                          inputTouched.gender && (
                              <div style={{ color: "red" }}>
                                {genderError}
                              </div>
                          )}
                          {genderError != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {genderError}
                              </div>
                          )}
                        </div>
                      </div>




                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="form-group">
                          <label for="" class="form-label">
                            Age <sup class="text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="please enter your"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="age"
                            value={inputValues.age}
                          />
                          {ageError != "" &&
                            !clicked &&
                            inputTouched.age && (
                              <div style={{ color: "red" }}>
                                {ageError}
                              </div>
                            )}
                          {ageError != "" && clicked && (
                            <div style={{ color: "red" }}>
                              {ageError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="" className="form-label">
                            Job Title <sup className="text-danger">*</sup>
                          </label>

                          <input
                              type="text"
                              className="form-control"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              value={inputValues.job_title}
                              readOnly={true}
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
                            placeholder="please enter university"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="university"
                            value={inputValues.university}
                          />
                          {universityError != "" &&
                            !clicked &&
                            inputTouched.university && (
                              <div style={{ color: "red" }}>
                                {universityError}
                              </div>
                            )}
                          {universityError != "" && clicked && (
                            <div style={{ color: "red" }}>
                              {universityError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="" className="form-label">
                            Last Educational Qualification
                            <sup className="text-danger">*</sup>
                          </label>

                          <input
                              type="text"
                              className="form-control"
                              placeholder="please enter your last education qualification"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="last_educational_qualification"
                              value={inputValues.last_educational_qualification}
                          />
                          {qualificationError != "" &&
                          !clicked &&
                          inputTouched.last_educational_qualification && (
                              <div style={{color: "red"}}>
                                {qualificationError}
                              </div>
                          )}
                          {qualificationError != "" && clicked && (
                              <div style={{color: "red"}}>
                                {qualificationError}
                              </div>
                          )}
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="" className="form-label">
                           Job Source
                            <sup className="text-danger">*</sup>
                          </label>

                          <input
                              type="text"
                              className="form-control"
                              placeholder="please enter your job source"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="job_source"
                              value={inputValues.job_source}
                          />
                          {JobSourceError != "" &&
                          !clicked &&
                          inputTouched.job_source && (
                              <div style={{color: "red"}}>
                                {JobSourceError}
                              </div>
                          )}
                          {JobSourceError != "" && clicked && (
                              <div style={{color: "red"}}>
                                {JobSourceError}
                              </div>
                          )}
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
                            placeholder="please enter total year of experiances"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="experinece"
                            value={inputValues.experinece}
                          />
                          {experienceError != "" &&
                            !clicked &&
                            inputTouched.experinece && (
                              <div style={{ color: "red" }}>
                                {experienceError}
                              </div>
                            )}
                          {experienceError != "" && clicked && (
                            <div style={{ color: "red" }}>
                              {experienceError}
                            </div>
                          )}
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
                            placeholder="please enter your Expertise/Interest Areas"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="interested_areas"
                            value={inputValues.interested_areas}
                          />
                          {interestAreaError != "" &&
                            !clicked &&
                            inputTouched.interested_areas && (
                              <div style={{ color: "red" }}>
                                {interestAreaError}
                              </div>
                            )}
                          {interestAreaError != "" && clicked && (
                            <div style={{ color: "red" }}>
                              {interestAreaError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="form-group">
                          <label for="" class="form-label">
                            notice period <sup class="text-danger">*</sup>
                          </label>
                          <select
                            class="form-select"
                            id=""
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="notice_period"
                            value={inputValues.notice_period}
                          >
                            <option value="">Select Notice Period</option>
                            <option value="Immedietly">Immedietly</option>
                            <option value="15 Days">15 Days</option>
                            <option value="1 Months">1 Months</option>
                            <option value="1 Months+">1 Months +</option>
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
                            placeholder="please enter your current salary"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="current_salary"
                            value={inputValues.current_salary}
                          />
                          {currentSalaryError != "" &&
                            !clicked &&
                            inputTouched.current_salary && (
                              <div style={{ color: "red" }}>
                                {currentSalaryError}
                              </div>
                            )}
                          {currentSalaryError != "" && clicked && (
                            <div style={{ color: "red" }}>
                              {currentSalaryError}
                            </div>
                          )}
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
                            placeholder="please enter your expected salary"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="expected_salary"
                            value={inputValues.expected_salary}
                          />
                          {expectedSalaryError != "" &&
                            !clicked &&
                            inputTouched.expected_salary && (
                              <div style={{ color: "red" }}>
                                {expectedSalaryError}
                              </div>
                            )}
                          {expectedSalaryError != "" && clicked && (
                            <div style={{ color: "red" }}>
                              {expectedSalaryError}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label for="" class="form-label">
                          cover letter <sup class="text-danger">*</sup>
                        </label>
                        <textarea
                          class="form-control"
                          placeholder="cover letter"
                          id=""
                          onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="cover_latter"
                           
                            value={inputValues.cover_latter}
                        ></textarea>
                        {coverLatterError != "" && !clicked && inputTouched.cover_latter && (
                            <div style={{ color: "red" }}>{coverLatterError}</div>
                          )}
                          {coverLatterError != "" && clicked && (
                            <div style={{ color: "red" }}>{coverLatterError}</div>
                          )}
                      </div> */}

                      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="" className="form-label">
                          Recent Photo <sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            placeholder=""
                            onChange={(e) => changeFileHandler(e,'photo')}
                            onBlur={(e) => handleTouched(e)}
                            name="image"
                        />

                        {photoError != "" && clicked && (
                            <div style={{color: "red"}}>{photoError}</div>
                        )}
                        {/* {isSuccess ? <p className="success-message">Validation successful</p> : null}
                          <p className="error-message">{resumeError}</p> */}
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label for="" class="form-label">
                          Resume <sup class="text-danger">*</sup>
                        </label>
                        <input
                          type="file"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => changeFileHandler(e,'resume')}
                          onBlur={(e) => handleTouched(e)}
                          name="file_name"
                        />

                        {resumeError != "" && clicked && (
                          <div style={{ color: "red" }}>{resumeError}</div>
                        )}
                        {/* {isSuccess ? <p className="success-message">Validation successful</p> : null}
                          <p className="error-message">{resumeError}</p> */}
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-4">
                        <button
                          class="btn btn-success apply-online-btn"
                          type="submit"
                        >
                          submit
                        </button>
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
  );
}

export default JobOnlineApply;
