import React from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import HomePage from "../pages/HomePage"
import {HashRouter, Route,Switch} from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage";
import SinglePokemonPage from "../pages/SinglePokemonPage";
import MyPokemons from "../pages/MyPokemons"


const AppRouter = () => {
    return(        
        <HashRouter>
            <Header></Header>  
            <div className="container content">
                <Switch>
                    <Route path="/" component={HomePage} exact={true}></Route>
                    <Route path="/mypokemons" component={MyPokemons} ></Route>
                    <Route path="/page/:page" component={HomePage}></Route>
                    <Route path="/pokemon/:id" component={SinglePokemonPage}></Route>                
                    <Route component={NotFoundPage}></Route>
                </Switch>
            </div>
            <Footer></Footer>
        </HashRouter>
    )
}
export default AppRouter;