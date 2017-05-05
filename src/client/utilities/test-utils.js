import React from 'react';
import {
    ApolloClient,
    ApolloProvider
} from 'react-apollo';

import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { schema } from './mock-schema';

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
const client = new ApolloClient({
    networkInterface: mockNetworkInterface,
});

export const TestProvider = (props) => (
    <ApolloProvider client={client}>
        { props.children }
    </ApolloProvider>
);