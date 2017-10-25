import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import userInputType from '../../types/user-input';

/**
 * add a new user
 */
export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve (root, params, { ctrl }) {
    return ctrl.user.create(params);
  }
};

