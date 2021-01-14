import React, { useEffect, useState } from 'react';
import './PkmItem.css';
import { PKM_DEF_PICTURE, PKM_PICTURE, MAX_PKM_NB } from '../../conf.js';

export default function PkmItem({data, action, selectedPkm, extraData, extraType = "pkm", passPkmData}){
    if(data.id < MAX_PKM_NB){
        if(data.id > 719 ){
            var imgLink = `${PKM_DEF_PICTURE}${data.id}.png`;
        }else{
            var imgLink = `${PKM_PICTURE}${data.id}.svg`;
        }
    }else{
        var imgLink = "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png";

    }

    const _clickOnPkm = () => {
        if(selectedPkm === data.id || selectedPkm === data.name){
            action(null);
        }else{
            if(extraType === "news"){
                action(data.name);
            }else{
                action(data.id);
                passPkmData(`${data.id}-${data.name}`)
            }
        }
    }

    const _displayExtraData = () => {
        if(selectedPkm === data.id || selectedPkm === data.name){
            return(
                extraData()
            )
        }
    }

    const whichClass = () => {
        if(selectedPkm){
            if(selectedPkm === data.id || selectedPkm === data.name){
                return "selected";
            }else{
                return "hidden"
            }
        }else{
            return "pkm-card";
        }
    }

{/*<article className={selectedPkm === data.id ? "pkm-card" : "pkm-card"} onClick={() => _clickOnPkm() }>*/}
    return(
        <article className={whichClass()} onClick={() => whichClass() === "selected" ? null :  _clickOnPkm() }>
            <div className="pkmImg">
                {whichClass() === "selected" && <button id="closeIcn" onClick={() => _clickOnPkm()}/> }
                <img src={imgLink} className="pkm-picture" alt="pkm-pic"/>
            </div>
            <h2>{data.id} - {data.name}</h2>
            {_displayExtraData()}
        </article>
    )
}

//<img src={"../../assets/close.svg"} /></button>