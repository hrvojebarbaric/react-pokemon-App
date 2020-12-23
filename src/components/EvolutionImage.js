import React, {useState,useEffect,Fragment} from "react"
import Axios from "axios"

import LoaderImage from "./Loader"
import imgNotFound from '../img/no-image.png';

const EvolutionImage = (props) => {
    const [pokemon, setPokemon] = useState({})
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)          
        const loadData = async() => {
            await Axios.get(props.url, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success                
                setPokemon(response.data)
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
    },[props.url])   
       
    return(            
        <Fragment>
            {
                isLoaded?<LoaderImage></LoaderImage>:pokemon.sprites && 
                <Fragment> 
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
                    <div>          
                    </div>
                </Fragment>                
            }                                          
        </Fragment>
    )
}

export default EvolutionImage