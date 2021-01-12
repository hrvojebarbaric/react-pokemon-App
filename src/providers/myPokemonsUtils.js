export const switchPokemonToList = (pokemonList, pokemonAddToList, img) => {
  const itemExist = pokemonList.find((item) => item.id === pokemonAddToList.id);
  if (!itemExist) {
    return [...pokemonList, { ...pokemonAddToList, checked: "true", img }];
  }
  return removePokemonFromList(pokemonList, pokemonAddToList);
};
export const removePokemonFromList = (pokemonList, pokemonRemoveFromList) => {
  return pokemonList.filter((item) => item.id !== pokemonRemoveFromList.id);
};
