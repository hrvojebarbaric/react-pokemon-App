import React, { useState, useEffect, useReducer, Fragment } from "react"
import Axios from "axios";
import debounce from 'lodash.debounce';

import pokemonReducer from "../reducers/pokemon"

import CardPokemon from "../components/CardPokemon"
import MainLoader from "../components/MainLoader"

const ListOfPokemons = (props) => { 
    
    const [jsonListPokemons, jsonDispatch ] = useReducer(pokemonReducer,[])
    const [numberOnPage, setNumberOnPage] = useState((+props.match.params.page))
    const [pageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset="+((numberOnPage-1)*20))
    const [isLoaded, setIsLoaded] = useState(true)

    const [numberOfPages,setNumberOfPages] = useState()

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)          
        const loadData = async() => {
            await Axios.get(pageUrl, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success
                //handle all other loads
                if(numberOnPage>=1&&numberOnPage<=Math.ceil(response.data.count/20)){
                    jsonDispatch({type:"POPULATE_POKEMON_LIST", jsonListPokemons:response.data})
                }
                else if (!isNaN(numberOnPage)){
                    return props.history.push("/page-not-found")                     
                } 
                //handle first load                
                if(isNaN(numberOnPage)) {
                    jsonDispatch({type:"POPULATE_POKEMON_LIST", jsonListPokemons:response.data})
                    setNumberOnPage(1)                  
                } 
                setNumberOfPages(Math.ceil(response.data.count/20))
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
        return () => { ourRequest.cancel()} 
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    },[pageUrl])

    const listOfPokemonsNext = () => { 
        setNumberOnPage(numberOnPage+1)
        setPageUrl("https://pokeapi.co/api/v2/pokemon/?offset="+(numberOnPage*20))
        props.history.push("/page/"+(numberOnPage+1))      
    }
    const listOfPokemonsPrev = () => {
        setNumberOnPage(numberOnPage-1)
        setPageUrl("https://pokeapi.co/api/v2/pokemon/?offset="+((numberOnPage*20)-40))
        props.history.push("/page/"+(numberOnPage-1))
    }
    // prevent button from being called too quickly    
    const clickPrev = debounce(listOfPokemonsPrev, 250)
    const clickNext = debounce(listOfPokemonsNext, 250) 
    return(        
        isLoaded?<MainLoader></MainLoader>:
        <Fragment>          
            <div className="buttons-next-prev">
                <button className="fs-2 fw-bold btn btn-warning" disabled={!jsonListPokemons.previous} onClick={jsonListPokemons.previous&&clickPrev}>Prev</button>
                <span className="fs-1 fw-bold">{numberOnPage} / {numberOfPages}</span>
                <button className="fs-2 fw-bold btn btn-warning" disabled={!jsonListPokemons.next} onClick={jsonListPokemons.next&&clickNext}>Next</button>
            </div>    
            <div className="row align-items-stretch">
                {                                                                               
                    jsonListPokemons.results && jsonListPokemons.results.map(({name,url},i) => {                        
                        return(
                            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex align-items-stretch" key={i}>
                                <div className="pokemon-item d-flex justify-content-center text-capitalize">    
                                    <div>
                                        <CardPokemon url={url} count={i}></CardPokemon>  
                                        <p className="head-line-card d-block w-100 text-center">{name}</p>                                                                             
                                    </div> 
                                </div>                               
                            </div>                        
                        );                         
                    })                    
                }               
            </div>                               
        </Fragment>           
    );
}
export default ListOfPokemons