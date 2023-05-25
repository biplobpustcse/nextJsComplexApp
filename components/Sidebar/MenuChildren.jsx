import React, {useEffect, useRef} from 'react';
import Router from "next/router";

const MenuChildren = ({data,breadCumbArraySet,breadcumb,trackingNumber,setTrackNumber}) => {
    const childrenRef = useRef()
    const categoryWiseProduct =  (data) => {
        //create object key  name for breadcumb
        let name = 'name' + trackingNumber
        let link = 'link' + trackingNumber
        let bdcmb = {}

        //push  value to breadcumb object
        bdcmb[name] =  data.name
        bdcmb[link] = data.id

        //check state undefined or key not exist in object then push new breadcumb to state
        if(breadcumb == undefined || !(Object.values(breadcumb).indexOf(data.id) > -1)) {
            breadCumbArraySet({...breadcumb, ...bdcmb})
            setTrackNumber(trackingNumber + 1)
        }else{
            //this code is for breadcumb manage - put only click data in breadcumb others will be removed
            if(breadcumb != undefined){
                //detect click data name
                name = Object.keys(breadcumb).find(key => breadcumb[key] === data.name);
                bdcmb = Object.fromEntries(Object.entries(breadcumb).filter(value => {
                        return parseInt(value[0].replace(/\D/g, "")) <= name.replace(/\D/g, "")
                    }
                ))
            }
            breadCumbArraySet({...bdcmb})
        }

        Router.push('/shop?cat_id='+data.id)
    }



    return (
        <>
        {data.length > 0 && data.map((children) => {
            return (
                 <ul className="submenu collapse children-sidebar" >
                    <li className="has-submenu">
                        <a className={children.children.length > 0 ? "nav-link parent-link" : "nav-link"} onClick={() => categoryWiseProduct(children)}>{children.name}</a>
                        {
                            children.children.length > 0 && <MenuChildren  setTrackNumber={setTrackNumber} trackingNumber={trackingNumber} breadCumbArraySet={breadCumbArraySet} breadcumb={breadcumb} data={children.children}/>
                        }
                    </li>
                 </ul>
            )
        })}
        </>
    );
};

export default MenuChildren;