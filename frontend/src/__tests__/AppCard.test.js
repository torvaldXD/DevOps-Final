import React from 'react';
import { render, screen } from '@testing-library/react';
import AppCard from '../components/AppCard';
import axios from 'axios';

jest.mock('axios');

describe('AppCard', () => {
  it('muestra mensaje de carga si la petición nunca se resuelve', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // nunca se resuelve

    render(<AppCard pokemonName="charmander" />);
    expect(screen.getByText(/Cargando Pokémon.../i)).toBeInTheDocument();
  });
});
