import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from '../../assets/logo.gif'

export default function Header(){
    const [btnClass, setBtnClass] = useState(false);

    const _toggleMenu = () => {
        //var element = document.getElementById('main-nav');
        console.log('clicked')
        if(btnClass === "open"){
            setBtnClass("");
        }else{
            setBtnClass("open")
        }
        /*if(element.classList.contains('open')){
            element.classList.remove('open');
        }else{
            element.classList.add('open');
        }*/
    }

    return(
        <header>
            <div className="container">
                <a href="/" id="logo-link">
                    <img alt="Logo" id="logo" src={logo}/>
                </a>

				<button id="menu-button" onClick={() => _toggleMenu()}></button>

                <nav id="main-nav" className={btnClass}>
                    <ul>
                        <li><a href="/" >Home</a></li>
                        <li><a href="/pokedex" >Pokedex</a></li>
                        <li><a href="/news" >Search news</a></li>
                        <li><a href="/pokeNews" >News from Pokemon</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}