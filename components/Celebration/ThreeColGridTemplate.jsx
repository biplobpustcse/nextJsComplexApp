import React from "react";

function ThreeColGridTemplate({children}) {
  return (
    <div
      class="tab-pane fade show active"
      id="threeC-view-tab-pane"
      role="tabpanel"
      aria-labelledby="threeC-view-tab"
      tabindex="0"
    >
      <div class="row">
        <div class="col-12">
          <div class="three-col-grid-container">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ThreeColGridTemplate;
