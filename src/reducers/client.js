import { CLIENT_SET, CLIENT_UNSET } from '../constants';

const initialSate = {};

const clientReducer = (state = initialSate, action) => {
  switch (action.type) {
    case CLIENT_SET:
      return {
        email: action.currentUser.user.email,
        firstName: action.currentUser.user.firstName,
        lastName: action.currentUser.user.lastName,
        id: action.currentUser.user._id,
        likes: action.currentUser.user.likes,
      };

    case CLIENT_UNSET:
      return {};

    default:
      return state;
  }
};

export default clientReducer;
