import React from 'react';

const CategoryDesciption = ({description}) => {
  return (
    <div className="category-description">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="category-description-bg">
              <h3>Description</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDesciption;
