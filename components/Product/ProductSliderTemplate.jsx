import React from 'react'

function ProductSliderTemplate({item,selectedImg,handleClickImage}) {
    return (
        <div className=""> 
          <img src={item} alt="" className="img-fluid" style={item === selectedImg ? {border:"3px solid green"}:{}} onClick={(event) => handleClickImage(event, item)}  />
        </div>
      );
}

export default ProductSliderTemplate