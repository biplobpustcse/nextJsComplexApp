import React from "react";

const Tabs = ({ tabInfo, tabClickHttp, setClicked }) => {
  const tabClickedHandler = (item) => {
    tabClickHttp(item.url, item.name);
    setClicked(true);
  };
  console.log(tabInfo);

  const slug = (string) => {
    console.log({ string });
    if (string != undefined && string.length > 0) {
      return string
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  };
  return (
    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
      {tabInfo !== undefined &&
        tabInfo.length > 0 &&
        tabInfo.map((item, index) => (
          <li
            class="nav-item"
            role="presentation"
            onClick={tabClickedHandler.bind(null, item)}
          >
            <button
              class={index == 0 ? "nav-link active" : "nav-link"}
              id={slug(item.name)}
              data-bs-toggle="tab"
              data-bs-target={slug(item.name)}
              type="button"
              role="tab"
              aria-controls={slug(item.name)}
              aria-selected="true"
            >
              {item.name}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Tabs;
