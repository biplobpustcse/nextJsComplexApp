import React from "react";

function TwoColGridTemplate({ children }) {
  return (
    <div
      class="tab-pane show active"
      id="twoC-view-tab-tab-pane"
      role="tabpanel"
      aria-labelledby="twoC-view-tab-tab"
      tabindex="0"
    >
      <div class="row">
        <div class="col-12">
          <div class="two-col-grid-container">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default TwoColGridTemplate;
