import React, { useState, useEffect, useContext, Fragment } from "react";
import Axios from "axios";

import LoaderImage from "./Loader"
import EvolutionImage from "./EvolutionImage"

import PokemonContext from "../context/pokemon-context"

const Evolution = () => {
    const [evo, setEvo] = useState({})
    const [isLoaded, setIsLoaded] = useState(true)

    const {jsonSpecies} = useContext(PokemonContext)

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)          
        const loadData = async() => {
            await Axios.get(jsonSpecies.evolution_chain.url, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success
                setEvo(response.data)
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
    },[jsonSpecies.evolution_chain.url])
    return (
        isLoaded?<LoaderImage></LoaderImage>:
            evo.chain.evolves_to.length > 0&&
            <Fragment>
                <div className="col-12 pt-5 pb-4"><h3>Evolution</h3></div>
                <div className="col-12 d-flex justify-content-center align-items-center flex-column flex-xl-row">            
                    {
                        evo.chain.evolves_to[0]&&
                        <div className="col-12 col-xl-3 py-3">
                            {
                                <span className="type-span">{evo.chain.evolves_to[0]&&evo.chain.species.name}</span>
                            }
                            {
                                evo.chain.evolves_to[0]&&<EvolutionImage url={`https://pokeapi.co/api/v2/pokemon/${evo.chain.species.url.split('/pokemon-species/')[1].slice(0, -1)}`}></EvolutionImage>
                            }
                        </div>
                    }
                    {
                        evo.chain.evolves_to[0]&&
                        <div className="col-12 col-xl-1 d-flex justify-content-center align-items-center py-5">
                        {
                            evo.chain.evolves_to[0]&&<span><p className="evolution-arrow">&#8594;</p><span>Level {evo.chain.evolves_to[0].evolution_details[0].min_level}</span></span>
                        }
                        </div>
                    }
                    {
                        evo.chain.evolves_to[0]&&
                        <div className="col-12 col-xl-3 py-3">
                        {
                            <span className="type-span">{evo.chain.evolves_to[0]&&evo.chain.evolves_to[0].species.name}</span>
                        }
                        {
                            evo.chain.evolves_to[0]&&<EvolutionImage url={`https://pokeapi.co/api/v2/pokemon/${evo.chain.evolves_to[0].species.url.split('/pokemon-species/')[1].slice(0, -1)}`}></EvolutionImage>
                        }
                    </div>}
                    {
                        evo.chain.evolves_to[0].evolves_to[0]&&
                        <div className="col-12 col-xl-1 d-flex justify-content-center align-items-center py-5">
                            {
                                evo.chain.evolves_to[0].evolves_to[0]&&<span><p className="evolution-arrow">&#8594;</p><span>Level {evo.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}</span></span>
                            }
                        </div>
                    }
                    {
                        evo.chain.evolves_to[0].evolves_to[0]&&
                        <div className="col-12 col-xl-3 py-3">
                            {
                                <span className="type-span">{evo.chain.evolves_to[0].evolves_to[0]&&evo.chain.evolves_to[0].evolves_to[0].species.name}</span>
                            }
                            {
                                evo.chain.evolves_to[0].evolves_to[0]&&<EvolutionImage url={`https://pokeapi.co/api/v2/pokemon/${evo.chain.evolves_to[0].evolves_to[0].species.url.split('/pokemon-species/')[1].slice(0, -1)}`}></EvolutionImage>
                            }
                        </div>
                    }
                </div>
            </Fragment>
        
    )
}
export default Evolution