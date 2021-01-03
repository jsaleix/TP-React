import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from '../../assets/logo.gif' // relative path to image 

export default function Header(){
    return(
        <header>
            <div className="container">
                <a href="/">
                    <img alt="Logo" id="logo" src={logo}/>
                </a>

                <nav>
                    <ul>
                        <li><a href="/" >Home</a></li>
                        <li><a href="/pokedex" >Pokedex</a></li>
                        <li><a href="/news" >Search news</a></li>
                        <li><a href="/" >News from Pokemon</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}