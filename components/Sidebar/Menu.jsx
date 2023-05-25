import React, {useCallback, useEffect, useRef, useState} from 'react';
import {http} from "../../services/httpService";
import {getDepartments, getMenu} from "../lib/endpoints";
import {useDispatch, useSelector} from "react-redux";
import MenuChildren from "./MenuChildren";
import Router from "next/router";
import {warn} from "next/dist/build/output/log";

const Menu = () => {
    const menus = useSelector((state) => {
        return state.category?.allMenus?.menus
    })
    const ref = useRef(null);
    const breadcumbRef = useRef()
    const dispatch = useDispatch();
    const [refClick, setRefClick] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // const [menus, setMenus] = useState([]);
    const [isVisibileError, setIsVisibleError] = useState(false);
    const [breadcumb, setbreadcumb] = useState();
    const [loaded, setLoaded] = useState(false);
    const [trackingNumber, setTrackNumber] = useState(1);
    const [render, setRender] = useState(false);

    // const GetSidebarMenus = useCallback(() => {
    //     http.get({
    //         url: getMenu,
    //         before: () => {
    //             setIsLoading(true);
    //         },
    //         successed: (res) => {
    //             setMenus(res[0]?.menus);
    //             setIsLoading(false);
    //         },
    //         failed: () => {
    //             setIsLoading(false);
    //             setIsVisibleError(true);
    //         },
    //     });
    // }, []);

    const categoryWiseProduct =  (e,data) => {
        setRender(true)
        let name = 'name' + trackingNumber
        let link = 'link' + trackingNumber

        //push  value to breadcumb object
        let bdcmb = {}
        bdcmb[name] =  data.name
        bdcmb[link] = data.id


        //check state undefined or key not exist in object then push new breadcumb to state

        if(breadcumb == undefined || !(Object.values(breadcumb).indexOf(data.id) > -1)
            ) {
            setbreadcumb({...breadcumb, ...bdcmb})
            setTrackNumber(trackingNumber + 1)
        }else{

            //this code is for breadcumb manage - put only click data in breadcumb others will be removed
            if(breadcumb != undefined) {
                name = Object.keys(breadcumb).find(key => breadcumb[key] === data.name);
                bdcmb = Object.fromEntries(Object.entries(breadcumb).filter(value => {
                        return parseInt(value[0].replace(/\D/g, "")) <= name.replace(/\D/g, "")
                    }
                ))
            }
            setbreadcumb({...bdcmb})

        }


        Router.push('/shop?cat_id='+data.id)
    }
    // useEffect(() => {
    //
    //     if(loaded == false) {
    //         GetSidebarMenus();
    //         setLoaded(true)
    //     }
    //
    //
    // }, [GetSidebarMenus]);

    useEffect(() => {
        if(breadcumb != undefined) {
            dispatch({
                type: "setBredCumbdata",
                payload: breadcumb,
            });
        }

    },[breadcumb])


    return (
        <div>
            <ul className="nav flex-column" id="nav_accordion">

                {
                    menus?.length > 0 &&
                    menus.map((menu) => {
                        return (
                            <li className="nav-item has-submenu">
                                <a className={menu.children.length > 0 ? "nav-link parent-link" : "nav-link"}  onClick={(e) => categoryWiseProduct(e,menu)}> {menu.name}</a>
                                <MenuChildren setTrackNumber={setTrackNumber} breadCumbArraySet={setbreadcumb}   trackingNumber={trackingNumber} breadcumb={breadcumb} data={menu.children}/>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    );
};

export default Menu;