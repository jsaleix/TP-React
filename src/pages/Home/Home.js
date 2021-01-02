import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Home.css'
export default function Home(){
    return(
        <>
        <section className="section" id="section1">
            <div className="container">
                <div>
                    <h2>API 1:</h2>
                    <h1>PokeApi</h1>
                    <p>All the Pokémon data you'll ever need in one place, easily accessible through a modern RESTful API.</p>
                    <a href="https://pokeapi.co/" className="cta-button cta-button--red">Consulter</a>
                </div>
            </div>
        </section>

        <section className="section" id="section2">
            <div className="container">
                <div>
                    <h2>API 2:</h2>
                    <h1>Newscatcher API</h1>
                    <p>We crawl and index hundreds of thousands of news articles daily, so you do not have to run web crawlers yourself.</p>
                    <a href="https://newscatcherapi.com/" className="cta-button cta-button--blue">Consulter</a>
                </div>            
            </div>
        </section>
        </>
    )
}