import { AUTH_SUCCESS, LOGOUT_SUCCESS } from 'actions/user';

const userReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { id: action.payload.id, email: action.payload.email };
    case LOGOUT_SUCCESS:
      return { id: undefined, email: undefined };
    default:
      return state;
  }
};

export default userReducer;
