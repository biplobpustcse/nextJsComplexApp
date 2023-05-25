import React, {useCallback, useEffect, useState} from 'react';
import {http} from "../../services/httpService";
import {menuAll} from "../lib/endpoints";
import {setMenus} from "../../redux/actions/categoryAction";
import { useDispatch} from "react-redux";
import SidebarChildren from "./sidebarChildren";


const SidebarRecursive = () => {
    const dispatch = useDispatch()
    const [menus, setMenu] = useState()
    const [render, setRender] = useState(false)
    const [breadcumb,setBreadcumb] = useState([])
    const [open, setOpen] = useState({
        state : false,
        id : '',
        categories : false 

    })
    const getMenuSettings = useCallback(() => {
        http.get({
            url: menuAll,
            before: () => {
            },
            successed: (res) => {
                // setAllMenu(res);
                dispatch(setMenus(res[0]))
                setMenu(res[0]?.departments.data);
            },
            failed: () => {
            },
        });
    }, []);

    const handleOpenClose = (menu,categories) => {
        let data;
        setOpen({
            state : !open.state,
            id : menu.id,
            categories : categories 
        })

        if (breadcumb.some(e => e.id === menu.id) ) {
          let newData =  breadcumb.filter((value) => {
             return value.id != menu.id
           })
           setBreadcumb(newData)
           data = newData
        }else{
          
             data = [
                {
                    name : menu.name,
                    id: menu.id,
                    link : '/shop?dept_id='+menu.id
                }
            ]
            setBreadcumb(data)
        }
        localStorage.setItem('dataBreadcumb',JSON.stringify(data));
       
    }

    useEffect(() => {
        if (render == false) {
            getMenuSettings()
            setRender(true)
        }
    }, [menus])
    return (
        <section id="sidebar" className="shadow-sm">
            <nav className="sidebar">
                <div className="sidebar-body">
                    <ul className="nav flex-column" id="nav_accordion">
                        {
                            menus?.length > 0 &&
                            menus.map((menu) => {
                                return (
                                    <li className="nav-item has-submenu">
                                        <a className={menu.categories.length > 0 ? "nav-link parent-link" : "nav-link"} onClick={() => handleOpenClose(menu,true)}> {menu.name}</a>
                                        <SidebarChildren data={menu.categories} open={open} breadcumb={breadcumb} setBreadcumb={setBreadcumb}/>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </nav>
        </section>
    );
};

export default SidebarRecursive;
