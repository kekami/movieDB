import { CLIENT_SET, CLIENT_UNSET } from '../constants';


export const setClient = currentUser => ({
  type: CLIENT_SET,
  currentUser,
});

export const unsetClient = () => ({
  type: CLIENT_UNSET,
});

