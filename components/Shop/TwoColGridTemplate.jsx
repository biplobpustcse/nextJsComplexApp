import React from 'react';

const TwoColGridTemplate = ({children}) => {
    return (
            <div
                className="tab-pane fade show active"
                id="twoC-view-tab-pane"
                role="tabpanel"
                aria-labelledby="twoC-view-tab"
                tabIndex="0"
            >
                <div className="row">
                    <div className="col-12">
                        <div className="two-col-grid-container">{children}</div>
                    </div>
                </div>
            </div>
    );
};

export default TwoColGridTemplate;