import './App.css';
import Route from './components/Route/Route.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

import Home from './pages/Home/Home.js';

function App() {
  return (
    <>
      <Header/>
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/pokedex">
        <p>Test</p>
      </Route>
      <Route path="/search">
        <p>Test</p>
      </Route>
      <Route path="/pokeNews">
        <p>Test</p>
      </Route>
      <Footer/>
    </>
  );
}

export default App;
