import React, { Fragment, useContext, useState } from "react";
import PokemonContext from "../context/pokemon-context";

import Loader from "./Loader";
import Evolution from "./Evolution";

import { useFetchData } from "../hooks/use-fetchData.effect";

const Species = () => {
  const { singlePokemon } = useContext(PokemonContext);

  const [isLoaded, setIsLoaded] = useState(true);
  const speciesPokemon = useFetchData(singlePokemon.species.url, setIsLoaded);

  return (
    <PokemonContext.Provider value={{ speciesPokemon, singlePokemon }}>
      {isLoaded ? (
        <Loader loaderClass={"spinner"} />
      ) : (
        <Fragment>
          <div className="col-12 col-md-4">
            <div className="d-flex justify-content-center">
              <span className="type-span">{speciesPokemon.base_happiness}</span>
            </div>
            <p className="type-desc">Base happiness</p>
          </div>
          <div className="col-12 col-md-4 type-line-x">
            <div className="d-flex justify-content-center">
              <span className="type-span">{speciesPokemon.capture_rate}</span>
            </div>
            <p className="type-desc">Catch rate</p>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex justify-content-center">
              <span className="type-span">
                {speciesPokemon.growth_rate.name}
              </span>
            </div>
            <p className="type-desc">Growth rate</p>
          </div>
          <Evolution></Evolution>
        </Fragment>
      )}
    </PokemonContext.Provider>
  );
};
export default Species;
