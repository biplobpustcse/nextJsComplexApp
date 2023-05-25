import React, {useEffect} from "react";
import {baseUrl, get} from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import { API } from "../../config";
import Head from "next/head";
import {pages} from "../../components/lib/endpoints";
function page_slug({ data }) {
  let {
    type,
    title,
    slug,
    content,
    meta_title,
    meta_description,
    keywords,
    meta_image,
  } = data;
  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={meta_description} />
        <meta property="og:image" content={meta_image} />
      </Head>
      <div className="container-fluid">
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
          className="custom-head"
        />
      </div>

      <hr />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export async function getServerSideProps({ req, res, params }) {
  let { slug } = params;
  try {
    const [slug_info, id] = slug.split("--");
    let path = baseUrl + pages;
    const { data } = await Axios.get(`${path}${id}`);
    return {
      props: {
        data: data?.data[0],
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
export default page_slug;
