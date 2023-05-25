import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

const FooterComponent = () => {
     const router = useRouter();
     const dispatch = useDispatch()
    const handleRedirect =(url,obj) => {
        dispatch({
            type: "setBredCumbdata",
            payload: {
                name1: obj.name,
                link1: url,
                name2: '',
                link2: '',
                name3: '',
                link3: '',
                name4: '',
                link4: '',
                name5: '',
                id5: '',
            },
        });
        router.push(url)
    }
    return (
        <>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-4">
                <h4 className="second-footer-title">membership</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/membership" as={`/membership`}>
                            <a className="nav-link ">
                                join wholesale club
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/membership/register"
                            as={`/membership/register`}
                        >
                            <a className="nav-link">
                                register your membership
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/membership/renew" as={`/membership/renew`}>
                            <a className="nav-link">
                                renew your membership
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/supplier-registration"
                            as={`/supplier-registration`}
                        >
                            <a className="nav-link">
                                be a supplier on wholesale club
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-4">
                <h4 className="second-footer-title">who we are</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/about-us--7`}>
                            <a className="nav-link ">about us</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/shipping-and-delivery--8`}>
                            <a className="nav-link">shipping and delivery</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/career" passHref>
                            <a className="nav-link">career</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/complain-policy--9`}>
                            <a className="nav-link">complain policy</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-4">
                <h4 className="second-footer-title">FAQ's</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/customer-care--10`}>
                            <a className="nav-link">customer care policy</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/order-confirmation--11`}>
                            <a className="nav-link">order confirmation</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/*<Link href="/shop?section_id=6" as={'/shop?section_id=6'}>*/}
                            <div className="nav-link" onClick={() =>  handleRedirect('/shop?section_id=6',{name : 'imported from usa'})
                            }>imported-usa us</div>
                        {/*</Link>*/}
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/feedback--12`}>
                            <a className="nav-link">feedback</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-4">
                <h4 className="second-footer-title">legal stuff</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/terms--5`}>
                            <a className="nav-link">terms & conditions</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/privacy--6`}>
                            <a className="nav-link">privacy policy</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/order-cancellation--13`}>
                            <a className="nav-link">order cancellation</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page/[slug]" as={`/page/disclaimer--14`}>
                            <a className="nav-link">disclaimer</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-4">
                <h4 className="second-footer-title"> others links</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        {/*<Link href="#">*/}
                            <a className="nav-link "  href="#">all category view</a>
                        {/*</Link>*/}
                    </li>
                    <li className="nav-item">
                        {/*<Link href="#">*/}
                            <a className="nav-link"  href="#">catelog/leaflet</a>
                        {/*</Link>*/}
                    </li>
                    <li className="nav-item">
                        {/*<Link href="#">*/}
                            <a className="nav-link"  href="#">site map</a>
                        {/*</Link>*/}
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    /!*<Link href="/page/disclaimer--14">*!/*/}
                    {/*        <a className="nav-link"  href="#">disclaimer</a>*/}
                    {/*    /!*</Link>*!/*/}
                    {/*</li>*/}
                </ul>
            </div>
        </>
    );
};

export default FooterComponent;