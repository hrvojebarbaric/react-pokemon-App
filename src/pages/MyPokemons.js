import React, { Fragment, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { PokemonContext } from "../providers/myPokemonsProvider";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import CustomButton from "../components/CustomButton";

const MyPokemons = () => {
  const { pokemonList, removePokemon } = useContext(PokemonContext);
  const history = useHistory();
  return (
    <Fragment>
      <div className="buttons-next-prev">
        <CustomButton buttonText={"Back"} onClick={() => history.goBack()} />
      </div>
      <div className="container text-center">
        <div className="row background-white justify-content-center">
          {pokemonList.length === 0 ? (
            <h1 className="p-4">You didn't catch a pokemon!</h1>
          ) : (
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Basic stats</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pokemonList.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img height="100px" alt={item.name} src={item.img} />
                    </td>
                    <td className="text-capitalize">
                      <Link to={"/pokemon/" + item.id}>{item.name}</Link>
                    </td>
                    <td>
                      <span>Weight: {item.weight / 10} kg</span> |{" "}
                      <span>Height: {item.height / 10} m</span>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removePokemon(item)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default MyPokemons;
