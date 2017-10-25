import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

/**
 * GraphQL user input definition
 */
export default new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  })
});
