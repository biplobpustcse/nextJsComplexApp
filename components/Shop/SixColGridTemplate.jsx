import React from "react";

function SixColGridTemplate({ children }) {
  return (
    <div
      class="tab-pane fade show active"
      id="sixC-view-tab-pane"
      role="tabpanel"
      aria-labelledby="sixC-view-tab"
      tabindex="0"
    >
      <div class="six-col-grid-container">
      { children }
      </div>
    </div>
  );
}

export default SixColGridTemplate;
