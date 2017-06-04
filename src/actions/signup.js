import { SIGNUP_REQUESTING } from '../constants';

export const signupRequest = ({ firstName, lastName, email, password }) => ({
  type: SIGNUP_REQUESTING,
  firstName,
  lastName,
  email,
  password,
});

