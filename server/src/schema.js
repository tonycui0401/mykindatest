import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

import fetch from 'node-fetch';

import { BASE_URL } from './constants';

const PersonType = new GraphQLObjectType({
  name: 'starship',
  description: 'A star wars Character',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'A character\'s  name',
      resolve: (starship) => starship.name
    },
    model: {
      type: GraphQLString,
      description: 'A star wars gender',
      resolve: (starship) => starship.model
    },
    speed: {
      type: GraphQLString,
      description: 'A star wars gender',
      resolve: (starship) => starship.max_atmosphering_speed
    },
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: () => ({
    starships: {
      type: new GraphQLList(PersonType),
      description: 'All Star Wars Characters',
      resolve: (root, args) => fetch(`${BASE_URL}/starships`)
        .then(response => response.json())
        .then(data => data.results)
    },
    Starship: {
      type: PersonType,
      args: {
        id: { 
          type: GraphQLString
        }
      },
      resolve: (root, args) => fetch(`${BASE_URL}/starships/${args.id}`)
          .then(response => response.json())
          .then(data => data)
      }
  })
})

export default new GraphQLSchema({
  query: QueryType
});