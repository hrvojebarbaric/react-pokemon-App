import React, {useEffect, useState} from "react"

import initPokemonContext from "../context/pokemon-context"
import { addPokemonToList, removePokemonFromList } from "./myPokemonsUtils"

export const PokemonContext = initPokemonContext

const MyPokemonProvider = ({children}) => {

    const [pokemonMyList, setPokemonMyList] = useState([]);

    const addRemovePokemon = (item, img) => setPokemonMyList(addPokemonToList(pokemonMyList, item, img));
    const removePokemon = item => setPokemonMyList(removePokemonFromList(pokemonMyList, item));
 
    useEffect(()=>{
        const pokemonMyList = JSON.parse(localStorage.getItem("pokemonList"))
        setPokemonMyList(pokemonMyList)
    },[]) 

    useEffect(()=>{    
        localStorage.setItem("pokemonList", JSON.stringify(pokemonMyList)) 
    },[pokemonMyList])

    return(
        <PokemonContext.Provider
        value={{
            pokemonMyList,
            setPokemonMyList,
            addRemovePokemon,
            removePokemon
          }}
        >        
        {children}
        </PokemonContext.Provider>
    )
}
export default MyPokemonProvider