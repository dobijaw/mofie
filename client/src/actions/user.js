export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const REGI_SUCCESS = 'REGI_SUCCESS';
export const REGI_FAILURE = 'REGI_FAILURE';

export const AUTH_LOCAL_SUCCESS = 'AUTH_LOCAL_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const registration = (dispatch, data) => {
  fetch('http://localhost:9000/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.warning) {
        dispatch({
          type: REGI_FAILURE,
          payload: {
            error: res.warning,
          },
        });
      } else {
        dispatch({
          type: REGI_SUCCESS,
          payload: {
            userID: res.userID,
            token: res.token,
          },
        });

        localStorage.setItem('token', res.token);
        localStorage.setItem('userID', res.userID);
      }
    })
    .catch((err) => {
      dispatch({
        type: REGI_FAILURE,
        payload: {
          message: err.error,
        },
      });
    });
};

export const localAuthenticate = (dispatch) => {
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');

  if (!token || !userID) return;

  dispatch({
    type: AUTH_LOCAL_SUCCESS,
    payload: {
      userID,
      token,
    },
  });
};

export const authenticate = (dispatch, data) => {
  fetch('http://localhost:9000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('authen res then');
      console.log(res);
      if (res.warning) {
        dispatch({
          type: AUTH_FAILURE,
          payload: {
            error: res.warning,
          },
        });
      } else {
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            userID: res.userID,
            token: res.token,
          },
        });

        localStorage.setItem('token', res.token);
        localStorage.setItem('userID', res.userID);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
};
