const pokemonReducer = (state, action) => {
    switch (action.type) {
        //i could use one populate for all loads but it is eaiser to read this way
        case "POPULATE_POKEMON_LIST":
            return action.jsonListPokemons
        case "POPULATE_POKEMON":
            return action.jsonPokemon
        case "POPULATE_SPECIES":
            return action.jsonSpecies
        case "POPULATE_MY_POKEMONS":
            return action.pokemonMyList
        case "ADD_MY_POKEMONS":
            if(state===null) {
                return [
                    { id:action.id, name:action.name, url:action.url, img:action.img, checked:action.checked }
                ]                
            }
            else {
                return [
                    ...state,
                    { id:action.id, name:action.name, weight:action.weight, img:action.img, checked:action.checked, height:action.height }
                ]                
            }            
        case "REMOVE_MY_POKEMONS":
            return state.filter((pokemon) => pokemon.id !== action.id)
        default:
            return state
    }
}
export {pokemonReducer as default}