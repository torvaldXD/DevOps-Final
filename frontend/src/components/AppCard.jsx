import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppCard = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState();
  const [error, setError] = useState(null);
  const [showAbilities, setShowAbilities] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el Pokémon:', error);
        setError(error);
      });
  }, [pokemonName]);

  if (error) return <p>Error al cargar el Pokémon.</p>;
  if (!pokemon || !pokemon.name || !pokemon.abilities || !pokemon.sprites?.front_default)
    return <p>Cargando Pokémon...</p>;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <Card.Body>
        <Card.Title style={{ textTransform: 'capitalize' }}>{pokemon.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Habilidades:</Card.Subtitle>

        {showAbilities ? (
          pokemon.abilities.length > 10 ? (
            <p>Demasiadas habilidades para mostrar.</p>
          ) : (
            <ul>
              {pokemon.abilities.map((item, index) => (
                <li key={index}>{item.ability.name}</li>
              ))}
            </ul>
          )
        ) : null}

        <Button onClick={() => setShowAbilities(!showAbilities)}>
          {showAbilities ? 'Ocultar habilidades' : 'Mostrar habilidades'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppCard;