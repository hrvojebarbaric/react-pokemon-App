import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { PokemonContext } from "../providers/myPokemonsProvider";
import Badge from "react-bootstrap/Badge";
import pokeBall from "../img/PngItem_25193.png";
import logo from "../img/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pokemonList } = useContext(PokemonContext);
  let navbarClasses = [];

  useEffect(() => {
    const handleScroll = () => {
        const offset = window.scrollY;
        offset > 0 ? setScrolled(true) : setScrolled(false) 
    }
    window.addEventListener('scroll',handleScroll)
    return () => window.removeEventListener('scroll',handleScroll)
  })

  scrolled && navbarClasses.push("sticky");

  return (
    <div className="header-outer">
      <header className={navbarClasses.join(" ")}>
        <div className="container h-100 d-flex">
          <div className="col-12 d-flex justify-content-center">
            <Link to="/">
              <img className="logo" alt="Pokemon logo" src={logo} />
            </Link>
            <Link to="/mypokemons">
              <Badge variant="warning">{pokemonList.length}</Badge>
              <img className="poke-ball" alt="My Pokemons" src={pokeBall} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
