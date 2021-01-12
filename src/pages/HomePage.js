import React, { useState, Fragment } from "react";
import debounce from "lodash.debounce";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFetchData } from "../hooks/use-fetchData.effect";

import CardPokemon from "../components/CardPokemon";
import MainLoader from "../components/MainLoader";
import CustomButton from "../components/CustomButton";

const HomePage = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [numberOnPage, setNumberOnPage] = useState(+match.params.page || 1);
  const [pageUrl, setPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=" + (numberOnPage - 1) * 20
  );
  const [isLoaded, setIsLoaded] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState();
  const listOfPokemons = useFetchData(pageUrl, setIsLoaded, setNumberOfPages);

  const listOfPokemonsNextPrev = debounce((linkId, num) => {
    setNumberOnPage(linkId);
    setPageUrl(
      "https://pokeapi.co/api/v2/pokemon/?offset=" + (numberOnPage * 20 - num)
    );
    history.push(`/page/${linkId}`);
  }, 250);

  return isLoaded ? (
    <MainLoader />
  ) : (
    <Fragment>
      <div className="buttons-next-prev">
        <CustomButton
          buttonText={"Prev"}
          disabled={!listOfPokemons.previous}
          onClick={() => listOfPokemonsNextPrev(numberOnPage - 1, 40)}
        />
        <span className="fs-1 fw-bold">
          {numberOnPage} / {numberOfPages}
        </span>
        <CustomButton
          buttonText={"Next"}
          disabled={!listOfPokemons.next}
          onClick={() => listOfPokemonsNextPrev(numberOnPage + 1, 0)}
        />
      </div>
      <div className="row align-items-stretch">
        {listOfPokemons.results.map(({ name, url }, i) => {
          return (
            <div
              className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex align-items-stretch"
              key={i}
            >
              <div className="pokemon-item d-flex justify-content-center text-capitalize">
                <div>
                  <CardPokemon url={url}></CardPokemon>
                  <p className="head-line-card d-block w-100 text-center">
                    {name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default HomePage;
