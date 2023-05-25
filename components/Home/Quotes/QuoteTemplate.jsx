import React from "react";

const QuoteTemplate = ({ item }) => {
  return (
    <div class="item">
      <div class="box">
        <p class="description">{item.quotation}</p>
      </div>
      <div class="author">
        <img class="rounded-circle" src={item.image} />
        <h5 class="name">{item.name}</h5>
        <p class="title">{item.designation}</p>
      </div>
    </div>
  );
};

export default QuoteTemplate;
