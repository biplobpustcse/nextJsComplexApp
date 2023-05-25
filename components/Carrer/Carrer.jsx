// import { getAllJobs } from "../../repositories/carrer";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { http } from "../../services/httpService";
import { getJobs } from "../lib/endpoints";
import router from "next/router";
import { useRouter } from "next/router";

const Carrer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [carrerJobs, setJobsData] = useState([]);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const router = useRouter();

  const GetAllJobs = useCallback(() => {
    http.get({
      url: getJobs,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsLoading(false);
        setJobsData(res);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    GetAllJobs();
  }, [GetAllJobs]);

  return (
    <>
      {!isLoading && carrerJobs.length > 0 && (
        <section className="single-job-main">
          <div className="container-fluid">
            <div className="row">
              {carrerJobs.map((job) => {
                return (
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="job-title">{job?.job_title}</h4>
                        <h4 className="job-vacancy">vacancy</h4>
                        <h4 className="total-vacancy">{job?.vacancy}</h4>
                        <div className="job-responsibility">
                          <h4 className="responsibility">job context</h4>
                          <div
                              dangerouslySetInnerHTML={{
                                __html: job.job_context,
                              }}
                          />
                        </div>
                        <div className="job-responsibility">
                          <h4 className="responsibility">
                            job responsibilities
                          </h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: job?.job_responsibility,
                            }}
                          />
                          <Link href="/career/[id]" as={`/career/${job.id}`}>
                            <a class="job-readmore"> read more </a>
                          </Link>

                          {/* <a onClick={handleClick.bind(null,'/carrer/'+job.id)}  className="job-readmore">
                            {" "}
                            read more{" "}
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Carrer;
