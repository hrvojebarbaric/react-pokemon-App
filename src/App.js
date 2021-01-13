import React from "react";

import MyPokemonProvider from "./providers/myPokemonsProvider";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/app.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SinglePokemonPage from "./pages/SinglePokemonPage";
import MyPokemons from "./pages/MyPokemons";

const App = () => {
  return (
    <MyPokemonProvider>
      <BrowserRouter>
        <Header></Header>
        <div className="container content">
          <Switch>
            <Route path="/" component={HomePage} exact={true}></Route>
            <Route
              path="/mypokemons"
              component={MyPokemons}
              exact={true}
            ></Route>
            <Route path="/page/:page" component={HomePage} exact={true}></Route>
            <Route
              path="/pokemon/:id"
              component={SinglePokemonPage}
              exact={true}
            ></Route>
            <Route component={NotFoundPage}></Route>
          </Switch>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </MyPokemonProvider>
  );
};
export default App;
