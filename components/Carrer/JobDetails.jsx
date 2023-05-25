import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { http } from "../../services/httpService";
import { getJobs } from "../lib/endpoints";
import Router from "next/router";

function CarrerJobDetails({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setjobDetailsData] = useState("");
  const [isVisibileError, setIsVisibleError] = useState(false);

  const GetSingleJobs = useCallback(() => {
    http.get({
      url: getJobs + `?id=${id}`,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setjobDetailsData(res[0]);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    GetSingleJobs();
  }, [GetSingleJobs]);

  // const getJobDetails = async () => {
  //   let data = await getSingleJob(id);
  //   setjobDetails(data[0]);
  // };
  // useEffect(() => {
  //   getJobDetails();
  // }, []);

  console.log("jobsDetails", jobDetails);
  return (
    <section className="jobdetails-main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {Object.keys(jobDetails).length !== 0 ? (
              <div className="card">
                <div className="card-body">
                  <h4 className="job-title">{jobDetails.job_title}</h4>
                  <h4 className="job-vacancy">vacancy</h4>
                  <h4 className="total-vacancy">{jobDetails.vacancy}</h4>

                  <div className="job-responsibility">
                    <h4 className="responsibility">job context</h4>
                    <div
                        dangerouslySetInnerHTML={{
                          __html: jobDetails.job_context,
                        }}
                    />
                  </div>

                  <div className="job-responsibility">
                    <h4 className="responsibility">job responsibilities</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetails.job_responsibility,
                      }}
                    />
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">employment status</h4>
                    <ul>
                      <li>{jobDetails.employment_status}</li>
                    </ul>
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">work place</h4>
                    <ul>
                      <li>{jobDetails.workplace}</li>
                    </ul>
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">educational requirements</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetails.educational_requirement,
                      }}
                    />
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">additional requirements</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetails.additional_requirement,
                      }}
                    />
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">job location</h4>
                    <ul>
                      <li>{jobDetails.job_location}</li>
                    </ul>
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">salary</h4>
                    <ul>
                      <li>
                         {jobDetails.is_negotiable == 1 ? 'Negotiable' : jobDetails.salary}
                      </li>
                    </ul>
                  </div>
                  <div className="job-responsibility">
                    <h4 className="responsibility">
                      compensation & other benefits
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetails.other_benefits,
                      }}
                    />
                  </div>
                  <h4 className="job-vacancy">apply procedure</h4>
                  <Link
                    href="/apply-online/[id]"
                    as={`/apply-online/${jobDetails.id}`}
                  >
                    <a class="btn apply-online-btn"> apply online </a>
                  </Link>
                  {/* <button class="btn apply-online-btn" onClick={(()=>Router.push('/apply-online/'+ jobDetails.id))}>apply online</button> */}
                  <p>
                    Application Deadline : <b>{jobDetails.deadline}</b>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p>No job found here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarrerJobDetails;
