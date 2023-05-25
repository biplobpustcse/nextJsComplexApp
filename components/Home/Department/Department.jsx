import React, { useCallback, useEffect, useState } from "react";
import { departmentDataConverter } from "../../../services/dataService";
import { http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getFeatureDepartment } from "../../lib/endpoints";
import ShopByCategory from "../ShopCategory/ShopByCategory";
import ShopCatTemplate from "../ShopCategory/ShopCatTemplate";

const Department = ({ data, setting }) => {
  const brandDataConverter = () => {
    const obj = [];
    data.map((item) => {
      obj.push({
        id: item.id,
        name: item.name,
        banner: item.logo,
        thumbnail_icon:item.thumbnail_icon,
        count: item.number_of_product,
        is_department : item?.is_department
      });
    });
    return obj?.slice(0, 6);
  };
  // const isVisible = setting.find(
  //   (item) => item.type == businessType.FeatureDept
  // );
  //#region clientSide
  // const [featureDeptData, setFeatureDeptData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const getFeatureData = useCallback(() => {
  //   http.get({
  //     url: getFeatureDepartment,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setIsLoading(false);
  //       setFeatureDeptData(departmentDataConverter(res.result));
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   getFeatureData();
  // }, []);
  //#endregion
  return (
    <>
      {data.length > 0 && (
        <ShopByCategory
          Template={ShopCatTemplate}
          section={'department'}
          headerText={"feature department"}
          url="all-featured-department"
          childUrl={'/shop?cat_id='}
          data={brandDataConverter()}
        />
      )}
    </>
  );
};

export default Department;
