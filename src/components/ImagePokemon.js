import React, {useContext} from "react"
import PokemonContext from "../context/pokemon-context";

import imgNotFound from '../img/no-image.png';

const ImagePokemon = () => {
 const {pokemon} = useContext(PokemonContext) 

 return (
    <img src={
        pokemon.sprites.other["official-artwork"].front_default ? pokemon.sprites.other["official-artwork"].front_default :
        imgNotFound
    } alt={pokemon.name}/>
 )
}
export default ImagePokemon