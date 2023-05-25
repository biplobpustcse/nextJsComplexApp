import React from "react";

function FiveColGridTemplate({ children }) {
  return (
    <div
      class="tab-pane fade show active"
      id="fiveC-view-tab-pane"
      role="tabpanel"
      aria-labelledby="fiveC-view-tab"
      tabindex="0"
    >
      <div class="row">
        <div class="col-12">
          <div class="five-col-grid-container">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default FiveColGridTemplate;
