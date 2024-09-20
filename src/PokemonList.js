import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => {
        setPokemons(res.data.results);
        setFilteredPokemons(res.data.results); 
      })
      .catch(err => console.error(err));
  }, []);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

   
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    
    setFilteredPokemons(filtered);
  };


  const getPokemonId = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  return (
    <div className="pokemon-list">
      <h1 className="text-3xl font-bold">Pokémon List</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search Pokémon"
        className="border p-2 mt-4 mb-4"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredPokemons.map((pokemon, index) => {
          const pokemonId = getPokemonId(pokemon.url); 
          return (
            <Link to={`/pokemon/${pokemonId}`} key={index}>
              <div className="card p-4 border rounded shadow hover:shadow-lg">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto"
                />
                <h2 className="text-center capitalize">{pokemon.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;
