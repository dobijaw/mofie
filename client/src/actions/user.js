export const AUTH_LOCAL = 'AUTH_LOCAL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const REGI_SUCCESS = 'REGI_SUCCESS';
export const REGI_FAILURE = 'REGI_FAILURE';

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
            id: res._id,
            email: res.email,
          },
        });
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
    type: AUTH_LOCAL,
    payload: {
      token: localStorage.getItem('token'),
      userID: localStorage.getItem('userID'),
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
            id: res._id,
            email: res.email,
          },
        });

        localStorage.setItem('token', res.token);
        localStorage.setItem('userID', res._id);
        localStorage.setItem('email', res.email);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};
