import React, { useEffect, useState } from 'react';
import PkmItem from '../../components/PkmItem/PkmItem';
import PokemonNews from '../../components/PokemonNews/PokemonNews';
import { PKM_GET_LIST, MAX_PKM_NB, NEWS_SEARCH, NEWS_API_KEY } from '../../conf.js'; 
import '../../App.css'; 
import './NewsFromPkm.css';
import loadingImg from '../../assets/loading.gif' // relative path to image 

export default function NewsFromPkm(){
    const [ loading, setLoading] = useState(true);
    const [ pkmList, setPkmList] = useState(null);
    const [ offSet, setOffSet ]  = useState("0");
    const [ limit, setLimit ]    = useState(10);
    const [ lang, setLang ]      = useState("en");
    const [selectedPkm, setSelectedPkm] = useState(null);
    const [ extraData, setExtraData ]   = useState(null);

    const fetchPkm = async() => {
        setLoading(true);
        try{
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
        }catch(e){
            console.error(e);
        }
        setLoading(false);
    }

    const fetchNews = async () => {
        setLoading(true);
        try{
            var res = await fetch(`${NEWS_SEARCH}?q=${selectedPkm}&lang=${lang}&media=True&sort_by=relevancy`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": NEWS_API_KEY,
                    "x-rapidapi-host": "newscatcher.p.rapidapi.com"
                }
            })
            .then((res) => res.json())
            .catch((e) => {});
            console.log(res);
            setExtraData(res.articles);
        }catch(e){
            console.error(e)
        }
        setLoading(false);
    }

    const _pkmData = () => {
        if(extraData)
        {
            return(
                <div className="news-cards">
                    {extraData.map((news) => <PokemonNews key={news._id} data={news} />)}
                </div>
            )
        }
    }

    const _renderPkm = () => {
        if(pkmList){
            return(
                <>
                <div className="pkm-cards">
                    {pkmList.map((pkm) => <PkmItem key={pkm.id} data={pkm} action={setSelectedPkm} selectedPkm={selectedPkm} extraData={() => _pkmData()} extraType="news" />)}
                </div>
                {!selectedPkm && <div className="dex-container">
                    <button className="cta-button cta-button--green" type="button" onClick={() => setLimit(limit + 10)}>More</button>
                </div>}
                </>
            )
        }else{
            return(
                <div className="dex-container">
                    <p>No result...</p>
                </div>
            )
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
            fetchNews();
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
                {loading ? <img src={loadingImg}/> : _renderPkm()}
                
            </section>
        </div>
    )
}