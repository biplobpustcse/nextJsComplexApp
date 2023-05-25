import React, { useCallback, useEffect, useRef, useState } from "react";

export const SslFooter = () => {
    
  return (
    <footer className="ssl-footer">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <img src="../assets/images/icon/SSLCommerz-footer.png" alt="" className="img-fluid"/>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="footer-border"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <p> &copy;
                        <script>document.write(new Date().getFullYear())</script> All Rights Reserved | Wholesale Club
                        Limited
                    </p>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <p className="developed-by">
                        Design & Developed By : <a href="https://mediasoftbd.com/" target="_blank">Mediasoft Data Systems
                            Ltd.</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}
