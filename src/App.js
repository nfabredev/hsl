import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import ShowStops from './ShowStops';
import './styles.css';

export default function App() {
  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  });

  const client = new ApolloClient({
    cache,
    link,
  });

  return (
    <ApolloProvider client={client}>
      <ShowStops />
    </ApolloProvider>
  );
}
