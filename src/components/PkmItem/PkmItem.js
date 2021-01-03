import React, { useEffect, useState } from 'react';
import './PkmItem.css';
import { PKM_DEF_PICTURE, PKM_PICTURE, MAX_PKM_NB } from '../../conf.js';

export default function PkmItem({data, action, selectedPkm, extraData}){
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
        if(selectedPkm === data.id){
            action(null);
        }else{
            action(data.id);
        }
    }

    const _displayExtraData = () => {
        if(selectedPkm === data.id){
            return(
                extraData()
            )
        }
    }

    const whichClass = () => {
        if(selectedPkm){
            if(selectedPkm === data.id){
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
        <article className={whichClass()} onClick={() => _clickOnPkm() }>
            <img src={imgLink } className="pkm-picture" alt="pkm-pic"/>
            <h2>{data.name}</h2>
            {_displayExtraData()}
        </article>
    )
}