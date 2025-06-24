import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AppCard from '../components/AppCard';
import axios from 'axios';

jest.mock('axios');

describe('AppCard', () => {
  const mockPokemonData = {
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra "Cargando Pokémon..." al inicio y luego renderiza datos del Pokémon', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<AppCard pokemonName="pikachu" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      'https://example.com/pikachu.png'
    );
  });

  it('verifica que el título del Pokémon esté capitalizado', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });

    render(<AppCard pokemonName="pikachu" />);

    await waitFor(() => {
      const titleElement = screen.getByText(/pikachu/i);
      expect(titleElement).toHaveStyle({ textTransform: 'capitalize' });
    });
  });

  it('muestra mensaje de carga si la petición nunca se resuelve', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // nunca se resuelve

    render(<AppCard pokemonName="charmander" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();
  });

  it('maneja error en la petición', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Error de red'));

    render(<AppCard pokemonName="bulbasaur" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur'
      )
    );

    console.error.mockRestore();
  });
  
});