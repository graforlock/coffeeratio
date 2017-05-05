// src/schema.js
const {
    makeExecutableSchema
} = require('graphql-tools');

const resolvers = require('../resolvers');

const typeDefs = `
type BrewMethod {
   id: ID!                
   name: String!
   image: String!
   description: String!
   ratios: [String]
   recipes: [Recipe]
}

type Recipe {
    id: ID!
    name: String!
    steps: [String]
}
type Query {
   brewMethods(name: String): [BrewMethod]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = { schema };