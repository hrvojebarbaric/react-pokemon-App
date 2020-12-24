import React, { Fragment, useContext } from "react"
import {Link} from "react-router-dom"

import PokemonContext from "../context/pokemon-context"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const MyPokemons = (props) => {

    const {pokemonMyList, pokemonMyListDispatch} = useContext(PokemonContext)     

    return(
        
        <Fragment>
            <div className="buttons-next-prev">
                <button className="fs-2 fw-bold btn btn-warning" onClick={()=>{ props.history.goBack() }}>Back</button>
            </div>
            <div className="container text-center">           
                <div className="row background-white justify-content-center">               
                    {
                        pokemonMyList.length===0?<h1 className="p-4">You didn't catch a pokemon!</h1>:
                        
                        <Table bordered responsive>
                        <thead>
                            <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Basic stats</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {pokemonMyList.map((item)=>
                            (                                                                   
                                <tr key={item.id}>
                                    <td><img height="100px" alt={item.name} src={item.img} /></td>
                                    <td className="text-capitalize"><Link to={"/pokemon/"+item.id}>{item.name}</Link></td>
                                    <td><span>Weight: {item.weight/10} kg</span> | <span>Height: {item.height/10} m</span></td>
                                    <td><Button variant="danger" onClick={()=>(
                                        pokemonMyListDispatch({
                                            type:"REMOVE_MY_POKEMONS",
                                            id: item.id               
                                        })
                                    )}>X</Button></td>
                                </tr>                                
                            )
                        )}
                        </tbody>
                    </Table>
                                            
                    }                    
                </div>                   
            </div>
        </Fragment> 
    )
}
export default MyPokemons