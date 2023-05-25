import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

function SliderWithText({ item,url }) {
  const dispatch = useDispatch();
 const router= useRouter()
  const clickCategory = (
    name1,
    id1,
    name2,
    id2,
    name3,
    id3,
    name4,
    id4
  ) => {
    console.log(router.pathname)
    dispatch({
      type: "setBredCumbdata",
      payload: { name1: name1, link1: id1, name2: name2, link2: id2,name3: name3, link3: id3,name4: name4, link4: id4 },
    });
    // set("dataBreadcumb",JSON.stringify({dept:name,cat1:"",subCat:"",subCat2:""}))
    Router.push(url+id1);
  };
console.log("banner",item)
  return (
    <div class="single-slide-box">
      <a
        onClick={clickCategory.bind(
          null,
          item.name,
          item.id,
          "",
          "",
          "",
          "",
          "",
          ""
        )}
      >
        <div class="image-box">
          <img src={item?.banner?item.banner:item.event_banner[0]  } alt="" class="img-fluid" />
        </div>
        <div class="product-title">
          <h3>{item?.name?item.name:item.event_title}</h3>
        </div>
      </a>
      
    </div>
  );
}

export default SliderWithText;
