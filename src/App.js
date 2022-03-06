import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MainMenu from './Pages/MainMenu';
import {Switch, Route} from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@kenzieHub:token"))

    if (token){
      return setAuthenticated(true)
    }
  }, [authenticated])

  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'}>
          <Login authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </Route>
        <Route exact path={'/register'}>
          <Register authenticated={authenticated}/>
        </Route>
        <Route exact path={'/menu'}>
          <MainMenu setAuthenticated={setAuthenticated} authenticated={authenticated}/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
