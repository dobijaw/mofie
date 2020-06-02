export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const REGI_SUCCESS = 'REGI_SUCCESS';
export const REGI_FAILURE = 'REGI_FAILURE';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const AUTH_LOCAL_SUCCESS = 'AUTH_LOCAL_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const registration = (dispatch, data) => {
  const controller = new window.AbortController();
  const { signal } = controller;

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
      if (!signal.aborted) {
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
      }
    })
    .catch((err) => {
      if (!signal.aborted) {
        dispatch({
          type: REGI_FAILURE,
          payload: {
            message: err.error,
          },
        });
      }
    });
};

export const localAuthenticate = (dispatch) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userID');

  if (!token || !userId) return;

  fetch(`http://localhost:9000/user/authenticate/${userId}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res.warning) {
        dispatch({
          type: AUTH_LOCAL_SUCCESS,
          payload: {
            userID: res.userId,
            token,
          },
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (dispatch, data) => {
  const controller = new window.AbortController();
  const { signal } = controller;

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
      if (!signal.aborted) {
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
          if (data.stayLogIn) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userID', res.userID);
          }
        }
      }
    })
    .catch((err) => {
      if (!signal.aborted) {
        console.log(err);
      }
    });
};

export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
};
