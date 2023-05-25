import React from "react";

const ShopProductViewAs = ({ setGridViewWsie }) => {
  return (
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="row-view-tab"
          data-bs-toggle="tab"
          data-bs-target="#row-view-tab-pane"
          type="button"
          role="tab"
          aria-controls="row-view-tab-pane"
          aria-selected="true"
          onClick={() => {
            setGridViewWsie(1);
          }}
        >
          <img src="../assets/images/icon/cr.svg" alt="" class="img-fluid" />
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="fourC-view-tab"
          data-bs-toggle="tab"
          data-bs-target="#fourC-view-tab-pane"
          type="button"
          role="tab"
          aria-controls="fourC-view-tab-pane"
          aria-selected="false"
          onClick={() => {
            setGridViewWsie(4);
          }}
        >
          <img src="../assets/images/icon/c4.svg" alt="" class="img-fluid" />
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="fiveC-view-tab"
          data-bs-toggle="tab"
          data-bs-target="#fiveC-view-tab-pane"
          type="button"
          role="tab"
          aria-controls="fiveC-view-tab-pane"
          aria-selected="false"
          onClick={() => {
            setGridViewWsie(5);
          }}
        >
          <img src="../assets/images/icon/c5.svg" alt="" class="img-fluid" />
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="sixC-view-tab"
          data-bs-toggle="tab"
          data-bs-target="#sixC-view-tab-pane"
          type="button"
          role="tab"
          aria-controls="sixC-view-tab-pane"
          aria-selected="true"
          onClick={() => {
            setGridViewWsie(6);
          }}
        >
          <img src="../assets/images/icon/c6.svg" alt="" class="img-fluid" />
        </button>
      </li>
    </ul>
  );
};

export default ShopProductViewAs;
