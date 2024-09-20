import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonList />,
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetail />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
