import React, { useState, useContext, Fragment } from "react";

import Loader from "./Loader";
import EvolutionImage from "./EvolutionImage";

import PokemonContext from "../context/pokemon-context";

import { useFetchData } from "../hooks/use-fetchData.effect";

const Evolution = () => {
  const { speciesPokemon } = useContext(PokemonContext);

  const [isLoaded, setIsLoaded] = useState(true);

  const evolution = useFetchData(
    speciesPokemon.evolution_chain.url,
    setIsLoaded
  );

  return isLoaded ? (
    <Loader loaderClass={"spinner"} />
  ) : (
    <Fragment>
      <div className="col-12 pt-5 pb-4">
        <h3>Evolution</h3>
      </div>
      <div className="col-12 d-flex justify-content-center align-items-center flex-column flex-xl-row">
        {
          <div className="col-12 col-xl-3 py-3">
            {<span className="type-span">{evolution.chain.species.name}</span>}
            {
              <EvolutionImage
                url={`https://pokeapi.co/api/v2/pokemon/${evolution.chain.species.url
                  .split("/pokemon-species/")[1]
                  .slice(0, -1)}`}
              ></EvolutionImage>
            }
          </div>
        }
        {evolution.chain.evolves_to.length > 0 && (
          <Fragment>
            {
              <div className="col-12 col-xl-1 d-flex justify-content-center align-items-center py-5">
                {
                  <span>
                    <p className="evolution-arrow">&#8594;</p>
                    <span>
                      Level
                      {
                        evolution.chain.evolves_to[0].evolution_details[0]
                          .min_level
                      }
                    </span>
                  </span>
                }
              </div>
            }
            {
              <div className="col-12 col-xl-3 py-3">
                {
                  <span className="type-span">
                    {evolution.chain.evolves_to[0].species.name}
                  </span>
                }
                {
                  <EvolutionImage
                    url={`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[0].species.url
                      .split("/pokemon-species/")[1]
                      .slice(0, -1)}`}
                  ></EvolutionImage>
                }
              </div>
            }
          </Fragment>
        )}
        {evolution.chain.evolves_to.length &&
          evolution.chain.evolves_to[0].evolves_to.length > 0 && (
            <Fragment>
              {
                <div className="col-12 col-xl-1 d-flex justify-content-center align-items-center py-5">
                  {
                    <span>
                      <p className="evolution-arrow">&#8594;</p>
                      <span>
                        Level
                        {
                          evolution.chain.evolves_to[0].evolves_to[0]
                            .evolution_details[0].min_level
                        }
                      </span>
                    </span>
                  }
                </div>
              }
              {
                <div className="col-12 col-xl-3 py-3">
                  {
                    <span className="type-span">
                      {evolution.chain.evolves_to[0].evolves_to[0].species.name}
                    </span>
                  }
                  {
                    <EvolutionImage
                      url={`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[0].evolves_to[0].species.url
                        .split("/pokemon-species/")[1]
                        .slice(0, -1)}`}
                    ></EvolutionImage>
                  }
                </div>
              }
            </Fragment>
          )}
      </div>
    </Fragment>
  );
};
export default Evolution;
