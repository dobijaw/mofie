import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  REGI_SUCCESS,
  REGI_FAILURE,
  LOGOUT_SUCCESS,
} from 'actions/user';

const userReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        id: action.payload.id,
        email: action.payload.email,
        error: undefined,
      };
    case REGI_SUCCESS:
      return {
        id: action.payload.id,
        email: action.payload.email,
        error: undefined,
      };
    case AUTH_FAILURE:
      return { ...state, error: action.payload.error };
    case REGI_FAILURE:
      return { ...state, error: action.payload.error };
    case LOGOUT_SUCCESS:
      return { id: undefined, email: undefined, error: undefined };
    default:
      return state;
  }
};

export default userReducer;
