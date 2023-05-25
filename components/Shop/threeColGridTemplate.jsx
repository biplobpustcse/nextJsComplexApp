import React from 'react';

const ThreeColGridTemplate = ({children}) => {
    return (
        <div
            className="tab-pane fade show active"
            id="threeC-view-tab-pane"
            role="tabpanel"
            aria-labelledby="threeC-view-tab"
            tabIndex="0"
        >
            <div className="row">
                <div className="col-12">
                    <div className="three-col-grid-container">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ThreeColGridTemplate;