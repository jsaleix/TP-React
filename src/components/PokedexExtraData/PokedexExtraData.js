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
            return( tmpDescriptions.map((desc) => <p key={desc.version}>{desc.text} ({desc.version})</p>) )
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
                {types.map( (type) => <img key={type} src={PKM_TYPE + type + ".svg"}/>)}
            </div>
        )
    }

    const _renderNames = () => {
        var i = 0;

        return(
            <div className="names-container">
                {names.map( (name) => {
                    if(i< 3){
                        i++;
                        return(
                            <p key={name.lang} className="anim-delay-500ms" onMouseOver={() => setLang(name.lang)} >{name.name} ({name.lang})</p>
                        )
                    }else if(i<6){
                        i++;
                        return (<p key={name.lang} className="anim-delay-1000ms" onMouseOver={() => setLang(name.lang)} >{name.name} ({name.lang})</p>)
                    }else if(i<9){
                        i++;
                        return (<p key={name.lang} className="anim-delay-1500ms" onMouseOver={() => setLang(name.lang)} >{name.name} ({name.lang})</p>)
                    }else{
                        return (<p key={name.lang} className="anim-delay-2000ms" onMouseOver={() => setLang(name.lang)} >{name.name} ({name.lang})</p>)
                    }
                })}
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

}