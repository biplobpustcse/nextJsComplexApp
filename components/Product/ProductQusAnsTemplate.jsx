import { Rating } from '@material-ui/lab';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { http } from '../../services/httpService';
import {
  getQusetjionByProduct,
  GetQusetjionByProduct,
  getReviewsByProduct,
  postLogin,
  postProductQuery,
  postProductQueryReply,
  postProductQueryReplyVote,
  postReview,
} from '../lib/endpoints';

function ProductQusAnsTemplate({ product }) {
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [question, setQuestion] = useState('');
  const [questionReply, setQuestionReply] = useState('');

  const [showQuestion, setShowQuestion] = useState(false);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aLLQuestion, setAlQuestion] = useState([]);
  const [isReplayAnser, setIsReplayAnser] = useState();

  function handleQuestion(e) {
    setQuestion(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('USERWHOLESALE25'));
    if (question.length > 0) {
      http.post({
        url: postProductQuery,
        payload: {
          product_id: product.id,
          question: question,
        },
        before: () => {},
        successed: (res) => {
          if (res.success) {
            getQuestionData();
            toast.success('Question Submitted Successfully.');
          }
        },
        failed: () => {
          toast.error('Something Went Wrong.');
        },
      });
    } else {
      toast.error('First Enter Your Question.');
    }
  }

  function handleQuestionReply({ target }) {
    setQuestionReply(target.value);
  }
  function handleSubmitReply(e, queryId) {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem('USERWHOLESALE25'));
    if (questionReply.length > 0) {
      http.post({
        url: postProductQueryReply,
        payload: {
          product_queries_id: queryId,
          reply: questionReply,
        },
        before: () => {},
        successed: (res) => {
          toast.success('Successfully Sumbitted.');
          getQuestionData();
        },
        failed: () => {
          setIsValid(true);
        },
      });
    } else {
      toast.error('Reply Some text First.');
    }
  }

  function getQuestionData() {
    http.get({
      url: getQusetjionByProduct + product.id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setAlQuestion(res);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  function handleWriteQuestion() {
    let user = localStorage.getItem('USERWHOLESALE25');
    if (!user) {
      router.push({ pathname: '/auth' });
    }
  }

  const handleVoteReview = (evt, userReview) => {
    evt.preventDefault();
    http.post({
      url: postProductQueryReplyVote,
      payload: {
        product_queries_reply_id: userReview.id,
        vote: userReview.vote,
      },
      before: () => {},
      successed: (res) => {
        if (res.success) {
          getQuestionData();
        } else {
          toast.error('Already voted.');
        }
      },
      failed: () => {
        toast.error('Something went wrong.');
      },
    });
  };
  useEffect(() => {
    let user = localStorage.getItem('USERWHOLESALE25');
    if (user) {
      setShowQuestion(true);
    }
  }, []);
  useEffect(() => {
    if (ctxAuth.isLoggedIn) {
      getQuestionData();
    }
  }, [ctxAuth]);
  return (
    <div class="review-main">
      <div>
        <h3> Customer questions</h3>
      </div>
      <div class="review-filters">
        <div class="search-box">
          <form action="">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search topics & reviews"
              />
              <button class="btn review-search-btn">
                <i class="icofont-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="rating-overview">
          <div class="single-rating">
            <h3>{product?.rating}</h3>
            <p>avg. customer ratings</p>
          </div>
          <div class="single-rating">
            <h3>{product.rating_count}</h3>
            <p>reviews</p>
          </div>
          <div class="single-rating">
            <h3>{product.qus_count}</h3>
            <p>questions</p>
          </div>
          <div class="single-rating">
            <h3>{product.ans_count}</h3>
            <p>answer</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
          <a class="btn write-review-btn" onClick={handleWriteQuestion}>
            write a question
          </a>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9">
          {showQuestion && (
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="write-review-wrapper">
                  <div class="write-review-form">
                    <form action="">
                      <label for="">Write a question</label>
                      <div class="form-floating">
                        <textarea
                          class="form-control w-200"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: '100px' }}
                          value={question}
                          onChange={handleQuestion}
                        ></textarea>
                        <button class="btn" onClick={handleSubmit}>
                          send question
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="mb-3 row">
                <label for="" class="col-sm-4 col-form-label">
                  sort by
                </label>
                <div class="col-sm-8">
                  <select class="form-select" aria-label="Default select">
                    <option selected>rating</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="mb-3 row">
                <label for="" class="col-sm-4 col-form-label">
                  sort by
                </label>
                <div class="col-sm-8">
                  <select class="form-select" aria-label="Default select">
                    <option selected>most helpful</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="mb-3 row">
                <label for="" class="col-sm-4 col-form-label">
                  show
                </label>
                <div class="col-sm-8">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>4</option>
                    <option value="1">8</option>
                    <option value="2">16</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {aLLQuestion.length > 0 &&
                aLLQuestion.map((userQuestion, index) => {
                  return (
                    <div class="single-review">
                      <div class="review-data">
                        <div className="question-flex">
                          <div className="icon">Q</div>
                          <div className="question-box">
                            <p className="main-qsn">{userQuestion.question}</p>
                            <div className="customer-name-box">
                              <i class="fa-regular fa-circle-check"></i>
                              {userQuestion.customer_name}
                              <span class="date"> - {userQuestion?.created_at}</span>
                            </div>
                          </div>
                        </div>
                        {userQuestion?.replies.data.length > 0 &&
                          userQuestion?.replies.data.map((userQusRep) => {
                            return (
                              <>
                                <div className="single-answer">
                                  <div className="icon">A</div>
                                  <div className="answer-box">
                                    <p className="main-qsn">
                                      {userQusRep.reply}
                                    </p>
                                    <div className="customer-name-box">
                                      {userQusRep?.replier_type || 'Customer'}
                                      <span class="date"> - {userQusRep?.created_at}</span>
                                    </div>
                                  </div>
                                </div>

                                {userQusRep.replier_type == 'admin' && (
                                  <ul className="nav mt-2">
                                    <li class="nav-item">
                                      <a class="nav-link disabled">helpful?</a>
                                    </li>
                                    <li class="nav-item">
                                      <a
                                        class="nav-link"
                                        onClick={(event) =>
                                          handleVoteReview(event, {
                                            id: userQusRep.id,
                                            vote: 'yes',
                                          })
                                        }
                                      >
                                        yes . {userQusRep.upvote_count}
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a
                                        class="nav-link"
                                        onClick={(event) =>
                                          handleVoteReview(event, {
                                            id: userQusRep.id,
                                            vote: 'no',
                                          })
                                        }
                                      >
                                        no . {userQusRep.downvote_count}
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a class="nav-link" href="#">
                                        report
                                      </a>
                                    </li>
                                  </ul>
                                )}
                              </>
                            );
                          })}

                        <div className="col-12">
                          <div className="write-review-wrapper">
                            <div className="write-review-form mb-0">
                              <form action="">
                                <label for="">Write a answer</label>
                                <div class="form-floating">
                                  <textarea
                                    class="form-control w-200"
                                    placeholder="Leave a comment here"
                                    id={'floatingTextarea2' + index}
                                    name={'floatingTextarea2' + index}
                                    style={{ height: '100px' }}
                                    // value={questionReply}
                                    onChange={handleQuestionReply}
                                  ></textarea>
                                  <button
                                    class="btn btn-outline-secondary mt-1"
                                    onClick={(event) =>
                                      handleSubmitReply(event, userQuestion.id)
                                    }
                                  >
                                    reply
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* <div class="single-review seller-single-review">
                <div class="purchaser-name-flex">
                  <h3 class="user-name">wholesale club</h3>
                  <div class="verified">
                    <i class="fa-regular fa-circle-check"></i>
                    verified Seller
                  </div>
                </div>
                <div class="review-date">4 month ago</div>
                <div class="review-data">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laborum aliquid nulla illum nobis quae, qui magnam mollitia
                    deleniti illo, eveniet modi. Mollitia nobis inventore odit
                    ad sequi officiis, tempore ea!
                  </p>

                  <ul class="nav d-none">
                    <li class="nav-item">
                      <a class="nav-link disabled">helpful?</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        yes . 100
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        no . 20
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        report
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductQusAnsTemplate;
