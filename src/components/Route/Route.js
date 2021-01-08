export default function Route({path, component}){
    return window.location.pathname === path ? component() : null;
}