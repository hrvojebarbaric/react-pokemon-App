import React, { useState, Fragment, useContext } from "react";
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"

import { PokemonContext } from "../providers/myPokemonsProvider"

import LoaderImage from "./Loader"
import ImagePokemon from "./ImagePokemon"

import {UsefetchData} from "../effects/use-fetchData.effect"

 const CardPokemon = ({url}) => {
    //state for loader, sets in custom hook useFetchData
    const [isLoaded, setIsLoaded] = useState(true)
    //get pokemons in cart
    const {pokemonMyList, addRemovePokemon } = useContext(PokemonContext)
    //load data with custom hook useFetchData from url and returns single pokemon
    const pokemon = UsefetchData(url,setIsLoaded)
    //checks if pokemon is in cart and change a button
    pokemon&&pokemonMyList.map((item)=> item.id===pokemon.id ? pokemon["checked"] = item.checked : null) 
    
    return(            
        <Fragment>
            {
                isLoaded?<LoaderImage></LoaderImage>:
                <Fragment> 
                    <Link to={`/pokemon/${url.split('/pokemon/')[1].slice(0, -1)}`}>
                        <ImagePokemon pokemonClass={"img-home"} pokemon={pokemon}></ImagePokemon>                 
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                {pokemon.types.map((item, i, arr)=> (arr.length - 1 === i) ? 
                                    (<span className="type-span" key={item.type.name}>
                                        {item.type.name}
                                    </span>) :
                                    (<span className="type-span" key={item.type.name}>
                                        {item.type.name} /&nbsp;
                                    </span>)
                                    )}
                            </div>                        
                            <p className="type-desc text-center">Type</p>
                        </div>
                    </Link>
                    <Form.Check onChange={() => addRemovePokemon(pokemon,pokemon.sprites.other["official-artwork"].front_default)}
                        type="switch"
                        id={pokemon.id}
                        label="Captured" 
                        className="switch switch-danger" 
                        defaultChecked={ pokemon.checked }            
                    />                       
                    <div>          
                    </div>
                </Fragment>                
            }                                          
        </Fragment>
    )
}
export default CardPokemon