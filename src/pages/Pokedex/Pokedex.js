import React, { useEffect, useState } from 'react';
import PkmItem from '../../components/PkmItem/PkmItem';
import PokedexExtraData from '../../components/PokedexExtraData/PokedexExtraData';
import { PKM_GET_LIST, PKM_GET_DATA, MAX_PKM_NB } from '../../conf.js'; 
import '../../App.css'; 
import './Pokedex.css';
import loadingImg from '../../assets/loading.gif' // relative path to image 

export default function Pokedex(){
    const [ loading, setLoading] = useState(true);
    const [ pkmList, setPkmList] = useState(null);
    const [ offSet, setOffSet ]  = useState("389");
    const [ limit, setLimit ]    = useState(6);
    const [selectedPkm, setSelectedPkm] = useState(null);
    const [ extraData, setExtraData ]   = useState(null);

    const fetchPkm = async() => {
        setLoading(true);
        try{
            setTimeout(async () => {
                var res = await fetch(`${PKM_GET_LIST}limit=${limit}&offset=${offSet}`)
                .then((res) => res.json())
                .catch((e) => {});

                var tmpList = [];
                res.results.forEach.call(res.results, pkm => {
                    var idPkm = (pkm.url).split("https://");
                    idPkm     = (idPkm[1]).split("/")[4];
                    let newPkm = {name: pkm.name, id: idPkm}
                    tmpList.push(newPkm);
                })
                setPkmList(tmpList);
                setLoading(false);

            }, pkmList ? 0 : 1500)
        }catch(e){
            console.error(e);
            setLoading(false);
        }
    }

    const fetchPkmData = async () => {
        setLoading(true);
        try{
            var res = await fetch(`${PKM_GET_DATA}${selectedPkm}/`)
            .then((res) => res.json())
            .catch((e) => {});
            
            var extra = await fetch(res.species.url)
            .then((res) => res.json())
            .catch((e) => {});

            if(!res.abilities){ throw {message: "Not found"}};
            var tmpTypes = [], tmpAbilities = [], tmpNames = [];

            res.types.forEach( type => {
                tmpTypes.push(type.type.name)
            })

            res.abilities.forEach( ability => {
                tmpAbilities.push(ability.ability.name)
            })

            extra.names.forEach( name => {
                tmpNames.push({lang: name.language.name, name: name.name})
            })

            setExtraData({  
                abilities:       tmpAbilities, 
                base_experience: res.base_experience, 
                types:           tmpTypes,
                descriptions:    extra.flavor_text_entries,
                names:           tmpNames
            });

        }catch(e){
            console.error(e);
        }
        setLoading(false);

    }

    const _pkmData = () => {
        if(extraData)
        {
            return(
                <PokedexExtraData data={extraData}/>
            
            )
        }
    }

    const _setLastSeen = (data) => {
        if(data){
            var currHistoric = [];
            var newHistoric  = [];

            for(var i=0; i<3; i++){
                if(localStorage.getItem(`pkm${i}`) && localStorage.getItem(`pkm${i}`) !== data ){
                    currHistoric[i] = localStorage.getItem(`pkm${i}`);
                }
            }
            newHistoric = [data].concat(currHistoric); 

            for(var i=0; i<3; i++){
                if(newHistoric[i]){
                    localStorage.setItem(`pkm${i}`, newHistoric[i]);
                }
            }

        }
    }

    const _renderPkm = () => {
        if(pkmList){
            return(
                <>
                <div className="pkm-cards">
                    {pkmList.map((pkm) => <PkmItem key={pkm.id} data={pkm} action={setSelectedPkm} selectedPkm={selectedPkm} extraData={() => _pkmData()} passPkmData={_setLastSeen} />)}
                </div>
                {!selectedPkm && !loading && <div className="dex-container">
                    <button className="cta-button cta-button--green" type="button" onClick={() => setLimit(limit + 6)}>More</button>
                </div>}
                </>
            )
        }else{
            if(!loading){
                return(
                    <div className="dex-container">
                        <p>No result...</p>
                    </div>
                )
            }

        }
    }

    const _changeOffset = (value) => {
        value = parseInt(value, 10);
        if(isNaN(value) || value > MAX_PKM_NB || value < 0) { 
            return null; 
        }
        setOffSet(value);
    }

    useEffect( () => {
        if(selectedPkm){
            setExtraData(null);
            fetchPkmData();
        }
    }, [selectedPkm]);

    useEffect(()=> {
        fetchPkm();
    }, [offSet, limit]);

    return(
        <div className="pokedex-div">
            <div className="container">
                <h2>POKEMON LIST</h2>
            </div>
            {!selectedPkm && 
            <div className="filters-container">
                <div>
                    <label>Starts after </label>
                    <input type="number" disabled={loading ? "disabled" : false} onChange={(e) => _changeOffset(e.target.value)} value={offSet}/>
                </div>
            </div>}
            <section className="results">
                {_renderPkm()}
                {loading ? <img src={loadingImg}/> : null}
            </section>
        </div>
    )
}