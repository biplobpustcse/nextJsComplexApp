import React from 'react';

const OfferSorting = () => {
    return (
        <section className="shop-product-sorting">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="sorting-flex-main">
                            <div className="breadcrumb-main">

                                <nav aria-label="breadcrumb" className="breadcrumbs medium-font">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#" role="button"
                                                                           tabIndex="0">Celebration </a></li>

                                        <li className="breadcrumb-item active" aria-current="page">16 december
                                            (Victory day)
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="price-range-main">
                                <div id="slider"></div>
                            </div>
                            <div className="sortby-main">
                                <div className="dropdown text-center">
                                    <button className="btn sortby-dropdown dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        sort by brand
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sortby-main">
                                <div className="dropdown text-center">
                                    <button className="btn sortby-dropdown dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        sort by relevence
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="viewall-main">
                                <h4> view as</h4>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="row-view-tab" data-bs-toggle="tab"
                                                data-bs-target="#row-view-tab-pane" type="button" role="tab"
                                                aria-controls="row-view-tab-pane"
                                                aria-selected="true">
                                            <img src="images/icon/cr.svg" alt="" className="img-fluid"/>
                                        </button>
                                    </li>
                                    <li className="nav-item " role="presentation">
                                        <button className="nav-link active" id="twoC-view-tab-tab" data-bs-toggle="tab"
                                                data-bs-target="#twoC-view-tab-tab-pane" type="button" role="tab"
                                                aria-controls="twoC-view-tab-tab-pane" aria-selected="true">
                                            <img src="images/icon/c2.svg" alt="" className="img-fluid"/>
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="threeC-view-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#threeC-view-tab-pane" type="button" role="tab"
                                                aria-controls="threeC-view-tab-pane" aria-selected="false">
                                            <img src="images/icon/c3.svg" alt="" className="img-fluid"/>
                                        </button>
                                    </li>


                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferSorting;