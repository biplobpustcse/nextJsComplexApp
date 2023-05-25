import router, { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import { getJobs, postJobs } from "../lib/endpoints";

const ApplyRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [getAllJobs, setGetAllJobs] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [fastNameError, setFastNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [coverLetterError, setCoverLetterError] = useState("");
  const [alterNumError, setAlterNumError] = useState("");
  const [jobSourceError, setJobSourceError] = useState("");
  const [lastEducation, setLastEducation] = useState("");
  const [selectedGender, setSelectedGender] = useState("Male");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [universityError, setUniversityError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [interestAreaError, setInterestAreaError] = useState("");
  const [noticePeriodError, setNoticePeriodError] = useState("");
  const [currentSalaryError, setCurrentSalaryError] = useState("");
  const [expectedSalaryError, setExpectedSalaryError] = useState("");
  const [coverLatterError, setCoverLatterError] = useState("");
  const [selectedJob, setSelectedJob] = useState();
  const [selectedJobError, setSelectedJobError] = useState("");
  //file
  const [resumeError, setResumeError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [okPermit, setOkPermit] = useState(false);
  const router = useRouter();

  const [inputValues, setInputValue] = useState({
    job_id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    experinece: "",
    interested_areas: "",
    notice_period: "Immedietly",
    current_salary: "",
    expected_salary: "",
    //cover_latter:"",
    file_name: "",
    image_name: "",
    lastEducation: "",
    coverLetter: "",
    alterNumber: "",
    jobSource: "",

  });
  const [inputTouched, setInputTouched] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    experinece: "",
    interested_areas: "",
    notice_period: "",
    current_salary: "",
    expected_salary: "",
    lastEducation: "",
    coverLetter: "",
    alterNumber: "",
    jobSource: "",
    image_name: "",
  });

  const jobSelectedhandler = (item) => {
    setSelectedJob(JSON.parse(item));
    setInputValue({...inputValues,job_id:JSON.parse(item).id})
  };


  const submitButtonHandler = () => {
    if(selectedJob == undefined) {
      return ;
    }


  };

  const getJobsAll = useCallback(() => {
    http.get({
      url: getJobs,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsLoading(false);
        setGetAllJobs(res);
        // setSelectedJob(res[0]);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  function handleChange(event) {
    debugger;
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }
  //file
  const changeFileHandler = (event) => {
    if (event.target.files.length > 0) {
      setInputValue({
        ...inputValues,
        ["file_name"]: event.target.files[0],
      });
    }
  };

  const changeFileImageHandler = (event) => {
    if (event.target.files.length > 0) {
      setInputValue({
        ...inputValues,
        ["image_name"]: event.target.files[0],
      });
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
    if(inputValues.job_id == 0 && (selectedJob == undefined ||  selectedJob == "") ) {

      setSelectedJobError('Designation Field is required')
      validatePass = false
    }else{
      setSelectedJobError("");

    }

    if (
      (inputValues.lastEducation.length == 0 && inputTouched.lastEducation) ||
      (inputValues.lastEducation.length == 0 && !inputTouched.lastEducation)
    ) {
      setLastEducation("Last Education Field is required.");
      validatePass = false
    } else {
      setLastEducation("");
    }
    if (
      (inputValues.coverLetter.length == 0 && inputTouched.coverLetter) ||
      (inputValues.coverLetter.length == 0 && !inputTouched.coverLetter)
    ) {
      validatePass = false

      setCoverLetterError("Cover Letter is required.");
    } else {
      setCoverLetterError("");
    }
    if (
      (inputValues.alterNumber.length == 0 && inputTouched.alterNumber) ||
      (inputValues.alterNumber.length == 0 && !inputTouched.alterNumber)
    ) {
      validatePass = false


      setAlterNumError("Alter Number is required.");
    } else {
      setAlterNumError("");
    }
    if (
      (inputValues.jobSource.length == 0 && inputTouched.jobSource) ||
      (inputValues.jobSource.length == 0 && !inputTouched.jobSource)
    ) {
      validatePass = false

      setJobSourceError("Job Source is required.");
    } else {
      setJobSourceError("");
    }

    if (
      (inputValues.firstName.length == 0 && inputTouched.firstName) ||
      (inputValues.firstName.length == 0 && !inputTouched.firstName)
    ) {
      validatePass = false


      setFastNameError("FastName is required.");
    } else {
      setFastNameError("");
    }

    if (
      (inputValues.lastName.length == 0 && inputTouched.lastName) ||
      (inputValues.lastName.length == 0 && !inputTouched.lastName)
    ) {
      validatePass = false


      setLastNameError("LastName is required.");
    } else {
      setLastNameError("");
    }
    // email validation
    if (
      (inputValues.email.length == 0 && inputTouched.email) ||
      (inputValues.email.length == 0 && !inputTouched.email)
    ) {
      validatePass = false


      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }
    //
    if (
      (inputValues.phone.length == 0 && inputTouched.phone) ||
      (inputValues.phone.length == 0 && !inputTouched.phone)
    ) {
      validatePass = false

      setPhoneError("Phone number is required.");
    } else {
      setPhoneError("");
    }
    //
    if (
      (inputValues.university.length == 0 && inputTouched.university) ||
      (inputValues.university.length == 0 && !inputTouched.university)
    ) {
      validatePass = false


      setUniversityError("University is required.");
    } else {
      setUniversityError("");
    }
    //
    if (
      (inputValues.experinece.length == 0 && inputTouched.experinece) ||
      (inputValues.experinece.length == 0 && !inputTouched.experinece)
    ) {
      validatePass = false


      setExperienceError("Experinece is required.");
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
      validatePass = false


      setInterestAreaError("Interested Areas is required.");
    } else {
      setInterestAreaError("");
    }
    //
    if (
      (inputValues.notice_period.length == 0 && inputTouched.notice_period) ||
      (inputValues.notice_period.length == 0 && !inputTouched.notice_period)
    ) {
      validatePass = false


      setNoticePeriodError("Notice Period is required.");
    } else {
      setNoticePeriodError("");
    }
    //
    if (
      (inputValues.current_salary.length == 0 && inputTouched.current_salary) ||
      (inputValues.current_salary.length == 0 && !inputTouched.current_salary)
    ) {
      validatePass = false


      setCurrentSalaryError("Current Salary is required.");
    } else {
      setCurrentSalaryError("");
    }
    //
    if (
      (inputValues.expected_salary.length == 0 &&
        inputTouched.expected_salary) ||
      (inputValues.expected_salary.length == 0 && !inputTouched.expected_salary)
    ) {
      validatePass = false


      setExpectedSalaryError("Expected Salary is required.");
    } else {
      setExpectedSalaryError("");
    }
    //file error
    validateSelectedFile();
    return  validatePass
  }
  // useEffect(() => {
  //   if (!isSuccess) {
  //     checkValidation();
  //   }
  // }, [inputValues, inputTouched]);

  function saveOnlineApplication() {}
  function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    if(checkValidation() == false) {
      return ;
    }
    http.file({
      url: postJobs,
      payload: {
        job_id: selectedJob.id,
        email: inputValues.email,
        phone: inputValues.phone,
        university: inputValues.university,
        experinece: inputValues.experinece,
        interested_areas: inputValues.interested_areas,
        notice_period: inputValues.notice_period,
        current_salary: inputValues.current_salary,
        expected_salary: inputValues.expected_salary,
        file_name: inputValues.file_name,
        name: inputValues.firstName + inputValues.lastName,
        cover_letter: inputValues.coverLetter,
        first_name: inputValues.firstName,
        last_name: inputValues.lastName,
        image: inputValues.image_name,
        alternative_number: inputValues.alterNumber,
        job_source: inputValues.jobSource,
        last_educational_qualification: inputValues.lastEducation,
        gender: selectedGender,
      },
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        // setJobsData(res);

        if(res.id != undefined){
          setIsLoading(false);

          toast.success("Job Application Form registered successfully . ");
          router.push("/");
        }else{
          toast.error(res.message);
        }
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
    // if (
    //   fastNameError != "" ||
    //   lastNameError != "" ||
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
    //
    //   setIsSuccess(false);
    //   return;
    // }


    // inputValues.job_id = selectedJob?.id == undefined && 0;

    // const formData = new FormData();
    // console.log("data", formData);
    // console.log(inputValues);
    // Object.keys(inputValues).map(function (key) {
    //   formData.append(key, inputValues[key]);
    // });
    setOkPermit(true);
    // saveOnlineApplication();

    setInputValue({
      job_id: 0,
      name: "",
      email: "",
      phone: "",
      university: "",
      experinece: "",
      interested_areas: "",
      notice_period: "",
      current_salary: "",
      expected_salary: "",
      //cover_latter:"",

      file_name: "",
    });
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  }
  useEffect(() => {
    getJobsAll();
  }, []);
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
                  {/* <h2>Data Entry Cum Product Analyst</h2> */}
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
                              First Name <sup class="text-danger">*</sup>
                            </label>

                            <input
                              type="text"
                              class="form-control"
                              placeholder="Please enter your fast name"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="firstName"
                              value={inputValues.firstName}
                            />
                            {fastNameError != "" &&
                              !clicked &&
                              inputTouched.firstName && (
                                <div style={{ color: "red" }}>
                                  {fastNameError}
                                </div>
                              )}
                            {fastNameError != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {fastNameError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Last Name <sup class="text-danger">*</sup>
                            </label>

                            <input
                              type="text"
                              class="form-control"
                              placeholder="Please enter your last name"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="lastName"
                              value={inputValues.lastName}
                            />
                            {lastNameError != "" &&
                              !clicked &&
                              inputTouched.lastName && (
                                <div style={{ color: "red" }}>
                                  {lastNameError}
                                </div>
                              )}
                            {lastNameError != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {lastNameError}
                              </div>
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
                              placeholder="Please enter your  email address"
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
                              placeholder="Please enter phone number"
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
                              Alternative Number{" "}
                              <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Please enter your expected salary"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="alterNumber"
                              value={inputValues.alterNumber}
                            />
                            {alterNumError != "" &&
                              !clicked &&
                              inputTouched.alterNumber && (
                                <div style={{ color: "red" }}>
                                  {alterNumError}
                                </div>
                              )}
                            {alterNumError != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {alterNumError}
                              </div>
                            )}
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
                              placeholder="Please enter university"
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
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <label for="" class="form-label">
                            Image <sup class="text-danger">*</sup>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            placeholder=""
                            onChange={(e) => changeFileImageHandler(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="file_name"
                          />

                          {resumeError != "" && clicked && (
                            <div style={{ color: "red" }}>{resumeError}</div>
                          )}
                          {/* {isSuccess ? <p className="success-message">Validation successful</p> : null}
                          <p className="error-message">{resumeError}</p> */}
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Gender <sup class="text-danger">*</sup>
                            </label>
                            <select
                              class="form-select"
                              id=""
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="gender"
                              // value={inputValues.gender}
                            >
                              <option
                                value="Male"
                                onClick={() => {
                                  setSelectedGender("Male");
                                }}
                              >
                                Male
                              </option>
                              <option
                                value="Female"
                                onClick={() => {
                                  setSelectedGender("Female");
                                }}
                              >
                                Female
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Last Educational Qualification{" "}
                              <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Please enter last education qualification"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="lastEducation"
                              value={inputValues.lastEducation}
                            />
                            {lastEducation != "" &&
                              !clicked &&
                              inputTouched.lastEducation && (
                                <div style={{ color: "red" }}>
                                  {lastEducation}
                                </div>
                              )}
                            {lastEducation != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {lastEducation}
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
                              placeholder="Please enter total year of experiances"
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
                              placeholder="Please enter your Expertise/Interest Areas"
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
                              <option value="Immedietly">Immedietly</option>
                              <option value="15 Days">15 Days</option>
                              <option value="1 Months">1 Months</option>
                              <option value="1 Months+">1 Months +</option>
                            </select>
                            {
                              noticePeriodError != "" && clicked ?  <div style={{ color: "red" }}>
                                {noticePeriodError}
                              </div>  : ""
                            }
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Select Designation{" "}
                              <sup class="text-danger">*</sup>
                            </label>
                            <select
                              class="form-select"
                              id=""
                              name="notice_period"
                              onChange={(e) => jobSelectedhandler(e.target[e.target.selectedIndex].getAttribute(
                                  "data-designation"
                              ))}
                            >
                              <option >Select Designation</option>
                              {getAllJobs.map((item) => (
                                <option
                                  value={item.job_title}
                                  data-designation={JSON.stringify(item)}
                                  // onClick={jobSelectedhandler.bind(null, item)}
                                >
                                  {item.job_title}
                                </option>
                              ))}
                            </select>
                            {
                              selectedJobError != "" && clicked ?  <div style={{ color: "red" }}>
                                {selectedJobError}
                              </div>  : ""
                            }
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
                              placeholder="Please enter your current salary"
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
                              placeholder="Please enter your expected salary"
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
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Cover Letter <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Please enter your cover letter"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="coverLetter"
                              value={inputValues.coverLetter}
                            />
                            {coverLetterError != "" &&
                              !clicked &&
                              inputTouched.coverLetter && (
                                <div style={{ color: "red" }}>
                                  {coverLetterError}
                                </div>
                              )}
                            {coverLetterError != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {coverLetterError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="form-group">
                            <label for="" class="form-label">
                              Job Source <sup class="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Please enter your Job source"
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="jobSource"
                              value={inputValues.jobSource}
                            />
                            {jobSourceError != "" &&
                              !clicked &&
                              inputTouched.jobSource && (
                                <div style={{ color: "red" }}>
                                  {jobSourceError}
                                </div>
                              )}
                            {jobSourceError != "" && clicked && (
                              <div style={{ color: "red" }}>
                                {jobSourceError}
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
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <label for="" class="form-label">
                            Resume <sup class="text-danger">*</sup>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            placeholder=""
                            onChange={(e) => changeFileHandler(e)}
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
                            onClick={submitButtonHandler}
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
    </>
  );
};

export default ApplyRegistration;
