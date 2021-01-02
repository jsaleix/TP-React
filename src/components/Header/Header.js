import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Header.css';

export default function Header(){
    return(
        <header>
            <div className="container">
                <a href="">
                    <img alt="Logo" id="logo" src="http://voltajazz.com/esgi/images/logo.svg"/>
                </a>

                <nav>
                    <ul>
                        <li><a href="/" >Home</a></li>
                        <li><a href="/" >Pokedex</a></li>
                        <li><a href="/" >Search news</a></li>
                        <li><a href="/" >News from Pokemon</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}