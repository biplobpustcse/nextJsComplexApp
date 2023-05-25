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
      <div class="common-fieldset-main">
        <fieldset class="common-fieldset">
          <legend class="rounded">recipes</legend>
          <div class="six-col-grid-container">
          { children }
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default SixColGridTemplate;
