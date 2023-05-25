import React from 'react';

function CommonSliderTemplate({ item }) {
  return (
    // <div className="sssss" style={{minHeight: '320px', background: `url(${item})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}>
    <div className="sssss">
      <img src={item} alt="" className="img-fluid" />
    </div>
  );
}

export default CommonSliderTemplate;
