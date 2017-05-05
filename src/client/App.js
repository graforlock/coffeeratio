import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, browserHistory } from 'react-router';
import routes from '../common/routes';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});
const client = new ApolloClient({
  networkInterface,
  initialState: window.__APOLLO_STATE__
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router routes={routes} history={browserHistory} />
      </ApolloProvider>
    );
  }
}

export default App;
