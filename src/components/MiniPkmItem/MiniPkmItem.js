import './MiniPkmItem.css';
 import { PKM_ICON_IMAGE } from '../../conf.js'; 

export default function MiniPkmItem({data, action}){
    var name = data?.split("-")[1];
    var id   = data?.split("-")[0];
    var picId= ("000" + id).substr(-3);
    return(
        <button onClick={() => action(name)}>
            <img src={PKM_ICON_IMAGE + picId + ".png"} alt={"Picture of " + name} />
        </button>
    )
}