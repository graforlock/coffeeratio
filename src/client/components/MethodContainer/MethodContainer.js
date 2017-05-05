import React from 'react';
import { gql, graphql } from 'react-apollo';

const MethodContainer = ({ data: { loading, error, brewMethods } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>{brewMethods.map(method => <li>{method.name}</li>)}</ul>;
};

export const methodContainerQuery = gql`
   query MethodContainerQuery($name: String) {
       brewMethods(name: $name) {
           id
           name
     }
   }
 `;

export default graphql(methodContainerQuery, {
  options: { pollInterval: 5000 }
})(MethodContainer);
