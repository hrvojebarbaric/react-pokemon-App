import React, { useState, Fragment } from "react";
import { Carousel } from "react-responsive-carousel";
import { useHistory, useRouteMatch } from "react-router-dom";

import PokemonContext from "../context/pokemon-context";
import { useFetchData } from "../hooks/use-fetchData.effect";

import MainLoader from "../components/MainLoader";
import LoadMovesPokemon from "../components/LoadMovesPokemon";
import ImagePokemon from "../components/ImagePokemon";
import Species from "../components/Species";
import CustomButton from "../components/CustomButton";

const SinglePokemonPage = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const singlePokemon = useFetchData(
    `https://pokeapi.co/api/v2/pokemon/${match.params.id}`,
    setIsLoaded
  );

  return (
    <PokemonContext.Provider value={{ singlePokemon }}>
      {isLoaded ? (
        <MainLoader />
      ) : (
        <Fragment>
          <div className="buttons-next-prev">
            <CustomButton
              buttonText={"Back"}
              onClick={() => history.goBack()}
            />
          </div>
          <div className="container text-center">
            <div className="row background-white margin-row-t justify-content-center">
              <div className="col-12 d-flex justify-content-center pokemon-image mb-4">
                <ImagePokemon pokemon={singlePokemon}></ImagePokemon>
              </div>
              <div className="col-12">
                {" "}
                <h1 className="text-capitalize text-center">
                  {singlePokemon.name}
                </h1>{" "}
              </div>
              <div className="col-12 py-4 type-line-bottom">
                <p>
                  Experience gained for defeating this Pokémon:{" "}
                  {singlePokemon.base_experience}
                </p>
                <div className="d-md-flex py-4">
                  <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-center">
                      {singlePokemon.types.map((item, i, arr) => {
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
                    <p className="type-desc">Type</p>
                  </div>
                  <div className="col-12 col-md-6 type-line-left">
                    <span className="type-span">
                      {singlePokemon.weight / 10}
                    </span>
                    <span className="type-desc"> kg</span>
                    <p className="type-desc">Weight</p>
                  </div>
                </div>
                <div className="d-md-flex py-4">
                  <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-center">
                      {singlePokemon.abilities.map((item, i, arr) => {
                        if (arr.length - 1 === i) {
                          return (
                            <span className="type-span" key={item.ability.name}>
                              {item.ability.name}
                            </span>
                          );
                        } else {
                          return (
                            <span className="type-span" key={item.ability.name}>
                              {item.ability.name} /&nbsp;
                            </span>
                          );
                        }
                      })}
                    </div>
                    <p className="type-desc">Ability</p>
                  </div>
                  <div className="col-12 col-md-6 type-line-left">
                    <span className="type-span">
                      {singlePokemon.height / 10}
                    </span>
                    <span className="type-desc"> m</span>
                    <p className="type-desc">Height</p>
                  </div>
                </div>
              </div>
              <div className="col-12 py-4 type-line-bottom">
                <h3 className="pb-4">Stats</h3>
                <div className="row">
                  {singlePokemon.stats.map((item) => (
                    <div className="col-12 d-flex" key={item.stat.name}>
                      <div className="col-3 text-right text-capitalize">
                        <p className="type-desc">{item.stat.name}</p>
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="stat-bar-bck">
                          <div
                            className={"stat-bar-loading " + item.stat.name}
                            style={{
                              width: (item.base_stat / 200) * 100 + "%",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="col-1 text-left font-weight-bold">
                        <p>{item.base_stat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 py-4 type-line-bottom">
                <h3 className="pb-4">Training</h3>
                <div className="row">
                  <Species></Species>
                </div>
              </div>
              <div className="col-12 py-4">
                <h3 className="pb-4">Moves</h3>
                <div className="row">
                  <Carousel
                    className="moves-slider"
                    showThumbs={false}
                    showIndicators={false}
                  >
                    {singlePokemon.moves.map((item) => (
                      <div className="col-12 col-md-10" key={item.move.name}>
                        <LoadMovesPokemon
                          url={item.move.url}
                        ></LoadMovesPokemon>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </PokemonContext.Provider>
  );
};
export default SinglePokemonPage;
