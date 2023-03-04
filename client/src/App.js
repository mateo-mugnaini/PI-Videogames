import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Detail from "./components/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import CreateGame from "./components/CreateGame/CreateGame";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App"></div>
      {location.pathname === "/" ? null : <NavBar />}
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/gamecreate">
          <CreateGame />
        </Route>
        <Route path="/detalle/:idVideojuegos">
          <Detail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
