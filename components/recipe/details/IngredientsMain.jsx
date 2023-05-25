import React from "react";

function IngredientsMain({children}) {
  return (
    <section class="recipe-ingredients-main">
      <div class="container-fluid">
        <div class="row">
        {children}
        </div>
      </div>
    </section>
  );
}

export default IngredientsMain;
