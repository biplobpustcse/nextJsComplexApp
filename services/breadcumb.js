export const breadcumbGenerate = (initial,data) => {
    let breadcumb = []
    if(initial) {
        let obj = {
            name : data.name,
            link : data.link
        }
        breadcumb.push(obj)
        localStorage.setItem(breadcumb)
    }else{
        let exisiting_breadcumb  =  localStorage.getItem('breadcumb')
        let obj = {
            name : data.name,
            link : data.link
        }
        let data = [...exisiting_breadcumb,obj]
        breadcumb.push(data)
        localStorage.setItem(breadcumb)
    }

}