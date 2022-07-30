import './App.css';
import HomePage from "./Pages/HomePage/HomePage";
import DetailsPage from "./Pages/DetailsPage/Details";
import FavouritesPage from "./Pages/FavouritesPage/Favourites";
import { LoginProvider } from './Pages/context';
import { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

function App() {

  // useEffect(() => {
  //   fetch('/v1/symbols')
  //   .then(resp => {
  //     console.log(resp);
  //   })
  // })

  const [isloggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <LoginProvider value={{ isloggedIn, setIsLoggedIn }}>
        <Switch>
          <Route exact path='/' >
            <HomePage />
          </Route>
          <Route path="/favourites">
            <FavouritesPage />
          </Route>
          <Route path="/details/:symbol">
            <DetailsPage />
          </Route>
        </Switch>


      </LoginProvider>
    </div>
  );
}

export default App;
