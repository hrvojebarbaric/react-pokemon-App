import React, { useEffect, useReducer} from 'react';

import Router from "./routers/Routers"

import pokemonReducer from "./reducers/pokemon"
import PokemonContext from "./context/pokemon-context"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

const App = () => {

  const [pokemonMyList, pokemonMyListDispatch] = useReducer(pokemonReducer,[])
  
  useEffect(()=>{
    const pokemonMyList = JSON.parse(localStorage.getItem("pokemonList"))
    pokemonMyListDispatch({type:"POPULATE_MY_POKEMONS", pokemonMyList})
  },[])

  useEffect(()=>{
    localStorage.setItem("pokemonList", JSON.stringify(pokemonMyList)) 
},[pokemonMyList])

  return(
    <PokemonContext.Provider value={{pokemonMyList, pokemonMyListDispatch}}> 
         <Router />
    </PokemonContext.Provider>
    
  )
}
export default App;
