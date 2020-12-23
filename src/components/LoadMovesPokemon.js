import React, {useState,useEffect} from "react"
import Axios from "axios";

import LoaderImage from "./Loader"

const LoadMovesPokemon = (props) => {
    const [moves, setMoves] = useState({})
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(()=>{
        const ourRequest = Axios.CancelToken.source()
        setIsLoaded(true)          
        const loadData = async() => {
            await Axios.get(props.url, {
                cancelToken: ourRequest.token
            }).then(function (response) {
                // handle success
                setMoves(response.data)
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
    },[props.url])

    return(            
            isLoaded?<LoaderImage></LoaderImage>:moves&& 
            <div>
                <div className="py-2">
                    <span className="text-capitalize type-span">{moves.name}</span>    
                    <p className="type-desc">Name:</p>
                </div> 
                <div className="">
                    <span className="text-effect type-span"> 
                    {
                            moves.effect_entries&&moves.effect_entries.map((item)=>(
                                item.short_effect.replace("$effect_chance", moves.effect_chance)
                            )
                        )
                    }                 
                    </span>
                    <p className="type-desc">Effect: 
                    </p>
                </div>
                <div className="pt-4 pb-2">
                    <div className="d-flex">
                    <div className="col-3 text-right text-capitalize">
                        <p className="type-desc">Accuracy: </p>
                    </div>
                    <div className="col-7 col-md-8">
                        <div className="stat-bar-bck">
                            <div className={"stat-bar-loading hp"} style={{ width: (moves.accuracy / 250 * 100) + "%" }} >                                        
                            </div>                                    
                        </div>
                    </div> 
                    <div className="col-1 text-left font-weight-bold">
                        <p>{moves.accuracy}</p>
                    </div>               
                </div>
                    <div className="d-flex">
                    <div className="col-3 text-right text-capitalize">
                        <p className="type-desc">Power: </p>
                    </div>
                    <div className="col-7 col-md-8">
                        <div className="stat-bar-bck">
                            <div className={"stat-bar-loading attack"} style={{ width: (moves.power / 250 * 100) + "%" }} >                                        
                            </div>                                    
                        </div>
                    </div> 
                    <div className="col-1 text-left font-weight-bold">
                        <p>{moves.power}</p>
                    </div>               
                </div>
                </div>                                           
            </div> 
            )
        }
export default LoadMovesPokemon