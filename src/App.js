import React from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/', 
  cache: new InMemoryCache(),
});

const GET_POKEMONS = gql`
  query getPokemons {
    pokemons(limit: 10, offset: 0) {
      results {
        id
        name
        image
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POKEMONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {data?.pokemons?.results?.map(pokemon => (
          <li key={pokemon.id}>
            {pokemon.name}
            
          </li>
          
        ))}
      </ul>
    </div>
  );
}

function ApolloApp() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default ApolloApp;