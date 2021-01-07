import React from "react"

import imgNotFound from '../img/no-image.png';

const ImagePokemon = ({pokemon,pokemonClass}) => {   
 return (
    <img className={pokemonClass} src={
        pokemon.sprites.other["official-artwork"].front_default ? pokemon.sprites.other["official-artwork"].front_default :
        imgNotFound
    } alt={pokemon.name}/>
 )
}
export default ImagePokemon