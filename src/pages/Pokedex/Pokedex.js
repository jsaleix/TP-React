import React, { useEffect, useState } from 'react';
import PkmItem from '../../components/PkmItem/PkmItem';
import { PKM_GET_LIST, PKM_GET_DATA } from '../../conf.js'; 
import '../../App.css'; 

import './Pokedex.css';

export default function Pokedex(){
    const [ loading, setLoading] = useState(true);
    const [ pkmList, setPkmList] = useState(null);
    const [ offSet, setOffSet ]  = useState("389");
    const [ limit, setLimit ]    = useState(10);
    const [selectedPkm, setSelectedPkm] = useState(null);

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

    const _pkmData = () => {
        return(
        <div>
            <p>ExtraData for {selectedPkm}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare odio dolor, non imperdiet nibh venenatis at. Pellentesque bibendum erat nec erat egestas, eget ullamcorper urna vestibulum. Etiam non ex sit amet enim sollicitudin faucibus tristique nec magna. Cras mauris lacus, sollicitudin id justo at, malesuada lacinia lorem. Pellentesque interdum leo vitae auctor dictum. In sit amet dui leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec tincidunt leo vel orci suscipit semper. Nullam in dolor in nunc fermentum bibendum. Integer fringilla mi ut elit dapibus consequat. Sed fringilla, metus id venenatis interdum, risus lorem accumsan eros, a semper est massa sed arcu. Vivamus scelerisque ex vel massa vulputate tempus. Aliquam cursus, dolor vel pulvinar vulputate, mauris turpis posuere arcu, quis dictum ex tortor facilisis mi. Aenean hendrerit sollicitudin odio laoreet sodales. Nulla a odio gravida, fermentum ligula sit amet, semper velit. Proin iaculis magna quis ex pulvinar pretium.</p>
        </div>
        )
    }


    const _renderPkm = () => {
        if(pkmList){
            return(
                <>
                <div className="pkm-cards">
                {pkmList.map((pkm) => <PkmItem key={pkm.id} data={pkm} action={setSelectedPkm} selectedPkm={selectedPkm} extraData={() => _pkmData()} />)}
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

    useEffect(()=> {
        fetchPkm();
    }, [offSet, limit]);

    return(
        <div className="pokedex-div">
            <div className="container">
                <h2>POKEMON LIST</h2>
            </div>
            <section className="results">
                {_renderPkm()}
            </section>
        </div>
    )
}