import React, { useState, useEffect, useReducer, Fragment } from "react";
import { Carousel } from 'react-responsive-carousel';
import Axios from "axios";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import pokemonReducer from "../reducers/pokemon"
import PokemonContext from "../context/pokemon-context"

import MainLoader from "../components/MainLoader"
import LoadMovesPokemon from "../components/LoadMovesPokemon";
import ImagePokemon from "../components/ImagePokemon";
import Species from "../components/Species"

const SinglePokemonPage = (props) => {
    const [pokemon, jsonDispatch] = useReducer(pokemonReducer,{})
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)          
        const loadData = async() => {
            await Axios.get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success
                jsonDispatch({type:"POPULATE_POKEMON", jsonPokemon:response.data})
                setIsLoaded(false) 
            }).catch(function (thrown) {
                if (Axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            });                          
        }        
        loadData()
        return () => { ourRequest.cancel() }
    },[props.match.params.id])
    return (
    <PokemonContext.Provider value={{pokemon}}>        
    {
        isLoaded?<MainLoader></MainLoader>:
        <Fragment>
            <div className="buttons-next-prev">
                <button className="fs-2 fw-bold btn btn-warning" onClick={()=>{ props.history.goBack() }}>Back</button>
             </div>
            <div className="container text-center">           
                <div className="row background-white margin-row-t justify-content-center">               
                    <div className="col-12 d-flex justify-content-center pokemon-image mb-4">
                        <ImagePokemon></ImagePokemon>                      
                    </div>               
                    <div className="col-12"> <h1 className="text-capitalize text-center">{pokemon.name}</h1> </div>
                    <div className="col-12 py-4 type-line-bottom"> 
                        <p>Experience gained for defeating this Pokémon: {pokemon.base_experience&&pokemon.base_experience}</p>
                        <div className="d-md-flex py-4">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-center">
                                    {
                                        pokemon.types&&pokemon.types.map((item, i, arr)=>{                                    
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
                                <p className="type-desc">Type</p>
                            </div>    
                            <div className="col-12 col-md-6 type-line-left">
                                <span className="type-span">{pokemon.weight&&pokemon.weight/10}</span><span className="type-desc"> kg</span>
                                <p className="type-desc">Weight</p> 
                            </div>                                                                
                        </div>
                        <div className="d-md-flex py-4">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-center">
                                    {
                                        pokemon.types&&pokemon.abilities.map((item, i, arr)=>{                                   
                                            
                                            if (arr.length - 1 === i) {
                                                return (<span className="type-span" key={item.ability.name}>
                                                {item.ability.name} 
                                                </span> )                                        
                                            } 
                                            else {
                                                return (<span className="type-span" key={item.ability.name}>
                                                {item.ability.name} /&nbsp;
                                                </span>)                                        
                                            }
                                    })}
                                </div>                        
                                <p className="type-desc">Ability</p>
                            </div>
                            <div className="col-12 col-md-6 type-line-left">                            
                                <span className="type-span">{pokemon.height&&pokemon.height/10}</span><span className="type-desc"> m</span>
                                <p className="type-desc">Height</p>
                            </div> 
                        </div>                    
                    </div>                           
                    <div className="col-12 py-4 type-line-bottom">
                        <h3 className="pb-4">Stats</h3>
                        <div className="row">
                            {pokemon.stats&&pokemon.stats.map((item)=>(
                                <div className="col-12 d-flex" key={item.stat.name}>
                                    <div className="col-3 text-right text-capitalize">
                                        <p className="type-desc">{item.stat.name}</p>
                                    </div>
                                    <div className="col-7 col-md-8">
                                        <div className="stat-bar-bck">
                                            <div className={"stat-bar-loading " + item.stat.name} style={{ width: (item.base_stat / 200 * 100) + "%" }} >                                        
                                            </div>                                    
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
                            <Carousel className="moves-slider" showThumbs={false} showIndicators={false}>
                                {
                                    pokemon.moves&&pokemon.moves.map((item)=>(
                                        <div className="col-12 col-md-10" key={item.move.name}>
                                            <LoadMovesPokemon url={item.move.url}></LoadMovesPokemon>
                                        </div>                                  
                                    ))
                                }   
                            </Carousel>
                        </div>
                    </div>
                </div>                   
            </div>
        </Fragment>        
    }
    </PokemonContext.Provider>
    )
}
export default SinglePokemonPage