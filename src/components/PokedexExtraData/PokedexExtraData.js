import React, { useEffect, useState } from 'react';
import { PKM_GET_LIST, PKM_GET_DATA, MAX_PKM_NB, PKM_TYPE } from '../../conf.js'; 
import './PokedexExtraData.css';

export default function PokedexExtraData({data}){
    var {abilities, base_experience, types, descriptions, names} = data
    const [ lang, setLang ] = useState("en");

    const _renderDescriptions = () => {
        var tmpDescriptions = [];
        descriptions.forEach( desc => {
            if(desc.language.name === lang){
                tmpDescriptions.push({text: desc.flavor_text, version: desc.version.name});
            }
        });
        if(tmpDescriptions.length > 0 ){
            return( tmpDescriptions.map((desc) => <p>{desc.text} ({desc.version})</p>) )
        }else{
            return( <p>No description available in this language</p> )
        }
    }

    const _renderAbilities = () => {
        return(
            abilities.map( (ability) => <p>{ability}</p> )
        )
    }

    const _renderTypes = () => {
        return(
            <div className="types-container">
                {types.map( (type) => <img src={PKM_TYPE + type + ".svg"}/>)}
            </div>
        )
    }

    const _renderNames = () => {
        return(
            <div className="names-container">
                {names.map( (name) => <p onMouseOver={() => setLang(name.lang)} key={name.name} >{name.name} ({name.lang})</p> )}
            </div>
        )
    }

    useEffect(()=> {
        console.log(descriptions)
    }, [data])

    return(
        <div className="">
            <div className="">
                {_renderNames()}
                {_renderTypes()}
                <div>
                    <h2>Descriptions {lang}</h2>
                    { _renderDescriptions()}
                </div>
            </div>
        </div>
    )

    return null
}