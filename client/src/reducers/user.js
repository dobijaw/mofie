import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  REGI_SUCCESS,
  REGI_FAILURE,
  LOGOUT_SUCCESS,
  AUTH_LOCAL_SUCCESS,
  CLEAR_ERRORS,
} from 'actions/user';

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
    case AUTH_LOCAL_SUCCESS:
    case REGI_SUCCESS:
      return {
        isAuth: true,
        id: payload.userID,
        token: payload.token,
        error: undefined,
      };
    case AUTH_FAILURE:
    case REGI_FAILURE:
      return { ...state, error: payload.error };
    case LOGOUT_SUCCESS:
      return { id: undefined, token: undefined, error: undefined, isAuth: false };
    case CLEAR_ERRORS: {
      return { ...state, error: undefined };
    }
    default:
      return state;
  }
};

export default userReducer;
