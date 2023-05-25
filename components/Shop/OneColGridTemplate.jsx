import React from 'react';

const OneColGridTemplate = ({children}) => {
    return (
        <div
            className="tab-pane fade show active"
            id="oneC-view-tab-pane"
            role="tabpanel"
            aria-labelledby="oneC-view-tab"
            tabIndex="0"
        >
            <div className="row">
                <div className="col-0">
                    <div className="one-col-grid-container">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default OneColGridTemplate;