import React, { useEffect, useState } from "react";

import initPokemonContext from "../context/pokemon-context";
import { switchPokemonToList, removePokemonFromList } from "./myPokemonsUtils";

export const PokemonContext = initPokemonContext;

const MyPokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonMyList] = useState([]);

  const switchPokemon = (item, img) =>
    setPokemonMyList(switchPokemonToList(pokemonList, item, img));
  const removePokemon = (item) =>
    setPokemonMyList(removePokemonFromList(pokemonList, item));

  useEffect(() => {
    const pokemonMyList = JSON.parse(localStorage.getItem("pokemonList"));
    setPokemonMyList(pokemonMyList);
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
  }, [pokemonList]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonMyList,
        switchPokemon,
        removePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
export default MyPokemonProvider;
