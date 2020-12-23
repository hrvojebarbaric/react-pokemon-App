import Axios from "axios";
import React, { useState, useEffect, Fragment, useContext } from "react";
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"

import PokemonContext from "../context/pokemon-context"

import LoaderImage from "./Loader"
import imgNotFound from '../img/no-image.png';

const CardPokemon = (props) => {
    const [pokemon, setPokemon] = useState({})
    const [isLoaded, setIsLoaded] = useState(true)

    const {pokemonMyList, pokemonMyListDispatch} = useContext(PokemonContext)

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)          
        const loadData = async() => {
            await Axios.get(props.url, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success
                console.log(response.data)
                pokemonMyList.map((item)=>{
                    if(item.id===response.data.id) {
                       return response.data["checked"] = item.checked;
                    }else {
                        return null
                    }                            
                }).then(setPokemon(response.data))
                
            }).catch(function (thrown) {
                if (Axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            });                          
        }        
        loadData()
        setIsLoaded(false)
        return () => { ourRequest.cancel() }       
    },[props.url,pokemonMyList]) 
    
    useEffect(()=>{
        localStorage.setItem("pokemonList", JSON.stringify(pokemonMyList)) 
    },[pokemonMyList])

    const addToList = (e) => {        
        if(e.target.checked) {
            pokemonMyListDispatch({
                type:"ADD_MY_POKEMONS",
                id: pokemon.id,
                name: pokemon.name,               
                img: pokemon.sprites.other["official-artwork"].front_default,
                checked: true,
                weight: pokemon.weight,
                height: pokemon.height
            }) 

        } else if(e.target.checked===false) {
            pokemonMyListDispatch({
                type:"REMOVE_MY_POKEMONS",
                id: pokemon.id               
            })
        }            
    }    
    return(            
        <Fragment>
            {
                isLoaded?<LoaderImage></LoaderImage>:pokemon.sprites && 
                <Fragment> 
                    <Link to={`/pokemon/${props.url.split('/pokemon/')[1].slice(0, -1)}`}>
                        <img className="img-home" src={
                            pokemon.sprites.other["official-artwork"].front_default ? pokemon.sprites.other["official-artwork"].front_default :
                            imgNotFound
                        } alt={pokemon.name}/>                    
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                {pokemon.types&&pokemon.types.map((item, i, arr)=>{
                                    if (arr.length - 1 === i) {
                                        return (<span className="type-span" key={item.type.name}>
                                        {item.type.name}
                                        </span> )                                        
                                    } else {
                                        return (<span className="type-span" key={item.type.name}>
                                        {item.type.name} /&nbsp;
                                        </span>)                                        
                                    }                          
                                })}
                            </div>                        
                            <p className="type-desc text-center">Type</p>
                        </div>
                    </Link>
                    <Form.Check onChange={e => addToList(e)}
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