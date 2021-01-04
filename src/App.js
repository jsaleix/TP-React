import './App.css';
import Route from './components/Route/Route.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

import Home from './pages/Home/Home.js';
import Pokedex from './pages/Pokedex/Pokedex.js';
import NewsFromPkm from './pages/NewsFromPkm/NewsFromPkm.js';
import News from './pages/News/News.js';
import NotFound from './pages/404/404.js';
import { useEffect } from 'react';

function App() {
  var validUrls = ["/", "/pokedex", "/news", "/pokeNews", "/404"]

  useEffect(()=> {
    if(!validUrls.includes(window.location.pathname)){
      window.location.replace("/404")
    }
  }, []);

  return (
    <>
      <Header/>
      <Route path="/" component={Home}/>
      <Route path="/pokedex" component={Pokedex}/>
      <Route path="/news" component={News}/>
      <Route path="/pokeNews" component={NewsFromPkm}/>
      <Route path="/404" component={NotFound}/>
      <Route path="" notFound={true} component={NotFound}/>
      <Footer/>
    </>
  );
}

export default App;
