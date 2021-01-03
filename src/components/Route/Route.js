export default function Route({path, component, notFound= false}){
    if(window.location.pathname === path){
        return component()
    }else{
        return null
    }
   
}