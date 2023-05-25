import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const MoreCategories = ({data}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleRedirect = (val) => {
    let breadcumb = JSON.parse(localStorage.getItem('dataBreadcumb'))
    let newdata = val.is_department == 1 ?  {...breadcumb,name1:  val.name ,link1: val?.id}  : {...breadcumb,name2:  val.name ,link2: val?.id}
    let url = val.is_department == 1 ? '/shop?dept_id='+val?.id :  '/shop?cat_id='+val?.id
    dispatch({
      type: "setBredCumbdata",
      payload: newdata
    });
    router.push(url)
  }
  return (
    <section class="more-categories-in mb-ten">
      <div class="container-fluid">
        <div class="row">
          <div className="col-12">
            <div className="bg">
              <h3>More categories </h3>
              <ul class="nav">
                {data != undefined &&
                  data?.map((val) => {
                   return (
                       <li className="nav-item" onClick={() => handleRedirect(val)}>
                         <a className="nav-link" >
                           {val?.name}
                         </a>
                       </li>
                   )
                  })
                }

              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreCategories;
