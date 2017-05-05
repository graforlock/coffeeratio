import 'isomorphic-fetch';

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import React from 'react';
import ReactDOM from 'react-dom/server';
import {
  ApolloClient,
  ApolloProvider,
  renderToStringWithData
} from 'react-apollo';
import getNetworkInterface from './transport';

// import cors from 'cors';
import path from 'path';

import Html from '../client/Html';
import routes from '../common/routes';

import { match, RouterContext } from 'react-router';

const bodyParser = require('body-parser');

const { schema } = require('./src/schema');

const PORT = 4000;

const server = express();

server.use(
  '/static',
  express.static(path.join(process.cwd(), 'public/client'))
);

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.use((req, res) => {
  match({ routes, location: req.originalUrl }, (
    error,
    redirectLocation,
    renderProps
  ) =>
    {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        // eslint-disable-line no-console
        res.status(500);
      } else if (renderProps) {
        const client = new ApolloClient({
          addTypename: true,
          dataIdFromObject: result => {
            if (result.id && result.__typename) {
              // eslint-disable-line no-underscore-dangle
              return result.__typename +
                result.id; // eslint-disable-line no-underscore-dangle
            }
            return null;
          },
          ssrMode: true,
          networkInterface: getNetworkInterface('http://localhost:4000', {
            cookie: req.header('Cookie')
          })
        });

        const component = (
          <ApolloProvider client={client}>
            <RouterContext {...renderProps} />
          </ApolloProvider>
        );

        renderToStringWithData(component)
          .then(content => {
            const data = client.store.getState().apollo.data;
            res.status(200);

            const html = (
              <Html content={content} state={{ apollo: { data } }} />
            );
            res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
            res.end();
          })
          .catch(e => {
            console.error('RENDERING ERROR:', e);
            // eslint-disable-line no-console
            res.status(500);
            res.end(
              `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${e.stack}`
            );
          });
      } else {
        res.status(404).send('Not found');
      }
    });
});

server.listen(
  PORT,
  () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);
