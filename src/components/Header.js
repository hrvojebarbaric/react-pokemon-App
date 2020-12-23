import React, { useState, useEffect, useContext } from "react"

import {Link} from "react-router-dom"
import PokemonContext from "../context/pokemon-context"
import Badge from 'react-bootstrap/Badge';
import pokeBall from '../img/PngItem_25193.png';

const Header = () => {    
    const [scrolled,setScrolled]=useState(false);
    const {pokemonMyList} = useContext(PokemonContext)
    
    const handleScroll=() => {
    const offset=window.scrollY;
        if(offset > 0 ){
        setScrolled(true);
        }
        else{
        setScrolled(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    })
    let navbarClasses=[];
    if(scrolled){
        navbarClasses.push('sticky');
    }
    
    return (
        <div className="header-outer">
            <header className={navbarClasses.join(" ")}>
                <div className="container h-100 d-flex justify-content-end align-items-center">  
                    <Link to="/mypokemons">
                        <Badge variant="warning">{pokemonMyList.length}</Badge>    
                        <img className="poke-ball" alt="" src={pokeBall} />
                    </Link>
                </div>
            </header>
        </div>        
    )    
}
export default Header