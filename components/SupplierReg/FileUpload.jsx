import React, { useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { addSupplerDocument, postJobs } from "../lib/endpoints";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

function SupplierFileUpload({ isEnable = true }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const getCookieInfoSupplier = getCookie("supplier");

  const [clicked, setClicked] = useState(false);

  const [documentTypeError, setDocumentTypeError] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [documents, setDocuments] = useState([]);

  const [isSubminForm, setIsSubminForm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  //initialize
  const [inputValues, setInputValue] = useState({
    document_type: "",
    document: "",
    comment: "",
  });
  const [inputTouched, setInputTouched] = useState({
    document_type: "",
    document: "",
  });

  const changeFileHandler = (event) => {
    if (event.target.files.length > 0) {
      setInputValue({ ...inputValues, ["document"]: event.target.files[0] });
      debugger;
    }
  };
  const validateSelectedFile = () => {
    const MIN_FILE_SIZE = 1024; // 1MB
    const MAX_FILE_SIZE = 5120; // 5MB

    if (!inputValues.document) {
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

  //event
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }
  function checkValidation() {
    if (
      (inputValues.document_type.length == 0 && inputTouched.document_type) ||
      (inputValues.document_type.length == 0 && !inputTouched.document_type)
    ) {
      setDocumentTypeError("Document type is required.");
    } else {
      setDocumentTypeError("");
    }
    //file error
    validateSelectedFile();
  }
  function saveOnlineApplication(data, e) {
    console.log("success", data);
    if (getCookieInfoSupplier) {
      http.file({
        url: addSupplerDocument + parseInt(getCookieInfoSupplier),
        payload: data,
        before: () => {
          setIsLoading(true);
        },
        successed: (res) => {
          let documentLocal = documents;
          if (res) {
            documentLocal.push({
              document: res.document,
              document_name: res.document_name,
              document_type: res.document_type,
              supplier_id: res.supplier_id,
              comment: res.comment,
            });
          }
          setDocuments(documentLocal);
          setIsSuccess(true);
          setClicked(false);
          setIsLoading(false);
          clearData(e);
        },
        failed: () => {
          setIsLoading(false);
          setIsVisibleError(true);
        },
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    if (documentTypeError != "" || resumeError != "") {
      console.log("failed");
      setIsSuccess(false);
      return;
    }
    // console.log("Success", expectedSalaryError);
    // const formData = new FormData();
    // console.log("data", formData);
    // console.log(inputValues);
    // Object.keys(inputValues).map(function (key) {
    //   formData.append(key, inputValues[key]);
    // });

    saveOnlineApplication(inputValues, e);

    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
  }
  function clearData(e) {
    debugger;
    e && e.preventDefault();
    setInputTouched({
      document: false,
    });
    setInputValue({
      document: "",
      comment: "",
      document_type: "",
    });
  }
  useEffect(() => {
    if (!isSuccess) {
      checkValidation();
    }
  }, [inputValues, inputTouched]);
  console.log("isEna", isEnable);
  return (
    <>
      <div className="upload-form-wrapper">
        <form
          action=""
          className="upload-form dropzone"
          id="myDropZone"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h4 className="form-title text-center mb-3">Upload Document</h4>

          <div className="mb-3 row">
            <label for="document" className="col-sm-2 col-form-label">
              Company Logo <sup className="text-danger">*</sup>
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="companylogo"
                name="companylogo"
              />
              {resumeError != "" && clicked && (
                <div style={{ color: "red" }}>{resumeError}</div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label for="document" className="col-sm-2 col-form-label">
              Document <sup className="text-danger">*</sup>
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="document"
                onChange={(e) => changeFileHandler(e)}
                onBlur={(e) => handleTouched(e)}
                name="document"
              />
              {resumeError != "" && clicked && (
                <div style={{ color: "red" }}>{resumeError}</div>
              )}
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">
              Document Type <sup className="text-danger">*</sup>
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleTouched(e)}
                name="document_type"
                value={inputValues.document_type}
              >
                <option value="" selected>
                  Select Document Type
                </option>
                <option value="trade license">Trade License</option>
                <option value="vat certificate"> Vat Certificate</option>
                <option value="tin certificate">TIN Certificate</option>
                <option value="bsti document">BSTI Document</option>
                <option value="company logo">Company Logo</option>
              </select>
              {documentTypeError != "" &&
                !clicked &&
                inputTouched.document_type && (
                  <div style={{ color: "red" }}>{documentTypeError}</div>
                )}
              {documentTypeError != "" && clicked && (
                <div style={{ color: "red" }}>{documentTypeError}</div>
              )}
            </div>
          </div>

          <div className=" row">
            <label for="comment" className="col-sm-2 col-form-label">
              Comment
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="comment"
                onChange={(e) => handleChange(e)}
                name="comment"
                value={inputValues.comment}
              />
            </div>
          </div>

          <div className=" d-grid gap-2 d-md-flex justify-content-md-center">
            <button
              type="submit"
              className="btn upload"
              // disabled={isEnable ? "" : "disabled"}
            >
              Upload
            </button>
            <button type="button" className="btn cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {documents.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered key-person">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Name</th>
                <th scope="col">Document Type</th>
                <th scope="col">Upload Status</th>
                <th scope="col">Download</th>
                <th scope="col">Comment</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.document_type}</td>
                    <td>{item.document_name}</td>
                    <td className="text-success">Success</td>
                    <td>
                      <a href={item.document}>Download</a>
                    </td>
                    <td>{item.comment}</td>
                  </tr>
                );
              })}
              {/* <tr>
              <td>1</td>
              <td>Trade Licence</td>
              <td>PDF</td>
              <td className="text-success">Success</td>
              <td>
                <a href="#">Download</a>
              </td>
              <td>Comment</td>
            </tr>
            <tr>
              <td>2</td>
              <td>VAT Certification</td>
              <td>PDF</td>
              <td className="text-warning">Pending</td>
              <td>
                <a href="#">Download</a>
              </td>
              <td>Comment</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Trade Licence</td>
              <td>PDF</td>
              <td className="text-danger">Failed</td>
              <td>
                <a href="#">Download</a>
              </td>
              <td>Comment</td>
            </tr> */}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default SupplierFileUpload;
