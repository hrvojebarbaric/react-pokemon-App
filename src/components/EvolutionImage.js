import React, {useState,Fragment} from "react"

import LoaderImage from "./Loader"
import ImagePokemon from "./ImagePokemon"

import {UsefetchData} from "../effects/use-fetchData.effect"

const EvolutionImage = ({url}) => {
     //state for loader, sets in custom hook useFetchData
    const [isLoaded, setIsLoaded] = useState(true)
    //load data with custom hook useFetchData from url and returns single pokemon
    const pokemon = UsefetchData(url,setIsLoaded)
       
    return(            
        <Fragment>
            {
                isLoaded?<LoaderImage></LoaderImage>:
                <Fragment> 
                        <ImagePokemon pokemonClass={"img-home"} pokemon={pokemon}></ImagePokemon>                     
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
                    <div>          
                    </div>
                </Fragment>                
            }                                          
        </Fragment>
    )
}
export default EvolutionImage