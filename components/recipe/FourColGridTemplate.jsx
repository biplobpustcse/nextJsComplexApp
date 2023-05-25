import React from "react";

function FourColGridTemplate({ children }) {
  return (
    <div
      class="tab-pane fade show active"
      id="fourC-view-tab-pane"
      role="tabpanel"
      aria-labelledby="fourC-view-tab"
      tabindex="0"
    >
      <div class="common-fieldset-main">
        <fieldset class="common-fieldset">
          <legend class="rounded">recipes</legend>
          <div class="four-col-grid-container">
          { children }
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default FourColGridTemplate;
