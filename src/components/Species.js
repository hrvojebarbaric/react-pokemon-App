import React, { Fragment, useContext, useEffect, useReducer, useState } from "react"
import Axios from "axios"
import pokemonReducer from "../reducers/pokemon"
import PokemonContext from "../context/pokemon-context"

import Loader from "./Loader"
import Evolution from "./Evolution"

const Species = () => {
    const [jsonSpecies, jsonDispatch] = useReducer(pokemonReducer,{})
    const [isLoaded, setIsLoaded] = useState(true)

    const {pokemon} = useContext(PokemonContext)

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)
        const loadData = async() => {
            await Axios.get(pokemon.species.url, {
                cancelToken: ourRequest.token
            }).then(function(respons) {
                //handle success
                jsonDispatch({type:"POPULATE_SPECIES", jsonSpecies:respons.data})
                setIsLoaded(false)
            }).catch(function(thrown) {
                if(Axios.isCancel(thrown)) {
                    console.log("Request canceled", thrown.message)
                }
                else {
                    //handle error
                }
            })
        }
        loadData()
        return () => {ourRequest.cancel()}
    },[pokemon.species.url])

    return(
        <PokemonContext.Provider value={{jsonSpecies}}>
        {
            isLoaded?<Loader></Loader>:
            <Fragment>
                <div className="col-12 col-md-4">
                    <div className="d-flex justify-content-center">
                        <span className="type-span">
                            {jsonSpecies.base_happiness&&jsonSpecies.base_happiness}
                        </span>
                    </div>                        
                    <p className="type-desc">Base happiness</p>
                </div>
                <div className="col-12 col-md-4 type-line-x">
                    <div className="d-flex justify-content-center">
                        <span className="type-span">
                            {jsonSpecies.capture_rate&&jsonSpecies.capture_rate}
                        </span>
                    </div>                        
                    <p className="type-desc">Catch rate</p>
                </div>
                <div className="col-12 col-md-4">
                    <div className="d-flex justify-content-center">
                        <span className="type-span">
                            {jsonSpecies.growth_rate&&jsonSpecies.growth_rate.name}
                        </span>
                    </div>                        
                    <p className="type-desc">Growth rate</p>
                </div>
                <Evolution></Evolution>
            </Fragment>
        }
        </PokemonContext.Provider>
        
    )
}
export default Species