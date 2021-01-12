import React, { useState, Fragment } from "react";

import Loader from "./Loader";
import ImagePokemon from "./ImagePokemon";

import { useFetchData } from "../hooks/use-fetchData.effect";

const EvolutionImage = ({ url }) => {

  const [isLoaded, setIsLoaded] = useState(true);
  const pokemon = useFetchData(url, setIsLoaded);

  return (
isLoaded ? (
  <Loader loaderClass={"spinner"} />
      ) : (
        <Fragment>
          <ImagePokemon
            pokemonClass={"img-home"}
            pokemon={pokemon}
          ></ImagePokemon>
          <div className="col-12">
            <div className="d-flex justify-content-center">
              {pokemon.types &&
                pokemon.types.map((item, i, arr) => {
                  if (arr.length - 1 === i) {
                    return (
                      <span className="type-span" key={item.type.name}>
                        {item.type.name}
                      </span>
                    );
                  } else {
                    return (
                      <span className="type-span" key={item.type.name}>
                        {item.type.name} /&nbsp;
                      </span>
                    );
                  }
                })}
            </div>
            <p className="type-desc text-center">Type</p>
          </div>
        </Fragment>
      )

  );
};
export default EvolutionImage;
