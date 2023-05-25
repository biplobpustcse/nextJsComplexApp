import React, {useEffect, useState} from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import Header from "../../components/SupplierReg/Header";
import RegistrationForm from "../../components/SupplierReg/RegistrationForm";
import SupplierDescription from "../../components/SupplierReg/SupplierDescription";
import SupplierSlider from "../../components/SupplierReg/SupplierSlider";
import {http} from "../../services/httpService";

function index() {
    const [supplierData,setSupplierData] = useState();
    const [track,setTrack] = useState(false);
    const getSupplierPageData = () => {
        http.get({
            url: 'supply-page-content',
            before: () => {
            },
            successed: (res) => {
                setSupplierData(res);
            },
            failed: () => {
            },
        });
    }

    useEffect(() => {
       getSupplierPageData()
    },[])
  return (
    <>
      {/* <Header /> */}
      <SupplierSlider  supplierData={supplierData}/>
      <SupplierDescription supplierData={supplierData}/>
      {/* <RegistrationForm /> */}
      <SecondFooter2 />
      <SslFooter2 />
    </>
  );
}

export default index;
