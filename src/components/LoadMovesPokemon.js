import React, { useState } from "react";
import { useFetchData } from "../hooks/use-fetchData.effect";

import Loader from "./Loader";

const LoadMovesPokemon = ({ url }) => {

  const [isLoaded, setIsLoaded] = useState(true);
  const moves = useFetchData(url, setIsLoaded);

  return isLoaded ? (
    <Loader loaderClass={"spinner"} />
  ) : (
    <div>
      <div className="py-2">
        <span className="text-capitalize type-span">{moves.name}</span>
        <p className="type-desc">Name:</p>
      </div>
      <div className="">
        <span className="text-effect type-span">
          {moves.effect_entries.map((item) =>
            item.short_effect.replace("$effect_chance", moves.effect_chance)
          )}
        </span>
        <p className="type-desc">Effect:</p>
      </div>
      <div className="pt-4 pb-2">
        <div className="d-flex">
          <div className="col-3 text-right text-capitalize">
            <p className="type-desc">Accuracy: </p>
          </div>
          <div className="col-7 col-md-8">
            <div className="stat-bar-bck">
              <div
                className={"stat-bar-loading hp"}
                style={{ width: (moves.accuracy / 250) * 100 + "%" }}
              ></div>
            </div>
          </div>
          <div className="col-1 text-left font-weight-bold">
            <p>{moves.accuracy}</p>
          </div>
        </div>
        <div className="d-flex">
          <div className="col-3 text-right text-capitalize">
            <p className="type-desc">Power: </p>
          </div>
          <div className="col-7 col-md-8">
            <div className="stat-bar-bck">
              <div
                className={"stat-bar-loading attack"}
                style={{ width: (moves.power / 250) * 100 + "%" }}
              ></div>
            </div>
          </div>
          <div className="col-1 text-left font-weight-bold">
            <p>{moves.power}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoadMovesPokemon;
