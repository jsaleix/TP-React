import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './News.css'
export default function News(){
    return(
        <div className="news-div">
            <div className="container">
                <h2>NEWS LIST</h2>
            </div>
            <section className="results">
            </section>
        </div>
    )
}