import React, { useState, Fragment, useContext } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import { PokemonContext } from "../providers/myPokemonsProvider";

import Loader from "./Loader";
import ImagePokemon from "./ImagePokemon";

import { useFetchData } from "../hooks/use-fetchData.effect";

const CardPokemon = ({ url }) => {

  const [isLoaded, setIsLoaded] = useState(true);
  const { pokemonList, switchPokemon } = useContext(PokemonContext);
  const pokemon = useFetchData(url, setIsLoaded);
  pokemon &&
  pokemonList.map((item) =>
      item.id === pokemon.id ? (pokemon["checked"] = item.checked) : null
    );

  return isLoaded ? (
    <Loader loaderClass={"spinner"} />
  ) : (
    <Fragment>
      <Link to={`/pokemon/${url.split("/pokemon/")[1].slice(0, -1)}`}>
        <ImagePokemon pokemonClass={"img-home"} pokemon={pokemon} />
        <div className="col-12">
          <div className="d-flex justify-content-center">
            {pokemon.types.map((item, i, arr) =>
              arr.length - 1 === i ? (
                <span className="type-span" key={item.type.name}>
                  {item.type.name}
                </span>
              ) : (
                <span className="type-span" key={item.type.name}>
                  {item.type.name} /&nbsp;
                </span>
              )
            )}
          </div>
          <p className="type-desc text-center">Type</p>
        </div>
      </Link>
      <Form.Check
        onChange={() =>
            switchPokemon(
            pokemon,
            pokemon.sprites.other["official-artwork"].front_default
          )
        }
        type="switch"
        id={pokemon.id}
        label="Captured"
        className="switch switch-danger"
        defaultChecked={pokemon.checked}
      />
    </Fragment>
  );
};
export default CardPokemon;
