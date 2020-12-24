import React, { useState, useEffect, useContext } from "react"

import {Link} from "react-router-dom"
import PokemonContext from "../context/pokemon-context"
import Badge from 'react-bootstrap/Badge';
import pokeBall from '../img/PngItem_25193.png';
import logo from '../img/logo.png';

const Header = () => {    
    const [scrolled,setScrolled]=useState(false);
    const {pokemonMyList} = useContext(PokemonContext)
    
    const handleScroll=() => {
        const offset=window.scrollY;
        offset > 0? setScrolled(true): setScrolled(false) 
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
                <div className="container h-100 d-flex">  
                    <div className="col-3"></div> 
                    <div className="col-6 d-flex justify-content-center">
                        <Link to="/">
                            <img className="logo" alt="" src={logo} />
                        </Link>
                    </div>
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <Link to="/mypokemons">
                            <Badge variant="warning">{pokemonMyList.length}</Badge>    
                            <img className="poke-ball" alt="" src={pokeBall} />
                        </Link>
                    </div>                    
                </div>
            </header>
        </div>        
    )    
}
export default Header