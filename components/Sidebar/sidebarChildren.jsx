import React,{useState} from 'react';

const SidebarChildren = ({data,open,breadcumb,setBreadcumb}) => {
    const [childOpen,setChildOpen] = useState(
        // data.map((value) => {
            // return
             {
                    state : false,
                    id : '',
                    categories : false
                }
        //  })
    )
    const handleOpenClose = (menu,categories) => {
        let data;
      
        setChildOpen({
            state :!childOpen.state,
            id : menu.id,
            categories : categories
        })

        //if data is already exist in breadcumb then remove it from the breadcumb
        if (breadcumb.some(e => e.id === menu.id)) {
            let newData =  breadcumb.filter((value) => {
               return value.id != menu.id
            })
             data = newData
             setBreadcumb([...newData])
           

          }else{
            //add new breadcumb
            data =  [...JSON.parse(localStorage.getItem('dataBreadcumb')),
                {
                    name : menu.name , 
                    id: menu.id,
                    link : '/shop?cat_id='+menu.id
                 } 
            ]
            setBreadcumb(data)
          }


          localStorage.setItem('dataBreadcumb',JSON.stringify(data));

    }
    return (
        <>
            {data.length > 0 && data.map((children) => {
                return (
                    <ul className={ ( (open.state == true && open.categories == true) ||  (open.state == true && open.id == children.parent_id)) ? "submenu collapsed" : " submenu collapse"}>
                        <li className="has-submenu">
                            <a className={children.children.length > 0 ? "nav-link parent-link" : "nav-link"} onClick={() => handleOpenClose(children,false)}>{children.name}</a>
                            {
                                children.children.length > 0 && <SidebarChildren data={children.children} open={childOpen} setBreadcumb={setBreadcumb} breadcumb={breadcumb}/>
                            }
                        </li>
                    </ul>
                )
            })}
        </>
    );
};

export default SidebarChildren;