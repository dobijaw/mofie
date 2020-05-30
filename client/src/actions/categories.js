export const ADD_CATEGORY = 'ADD_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const getCategories = (dispatch, userID) => {
  fetch(`http://localhost:9000/category/${userID}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: [
          ...res.data.map((c) => ({
            id: c._id,
            value: c.value,
          })),
        ],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCategory = (dispatch, data) => {
  fetch('http://localhost:9000/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: data.id,
      value: data.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.warning) {
        dispatch({
          type: ADD_CATEGORY,
          payload: {
            id: res.id,
            value: res.value,
          },
        });
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCategory = (dispatch, id) => {
  fetch(`http://localhost:9000/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: DELETE_CATEGORY,
        payload: {
          id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCategory = (dispatch, { id, value }) => {
  fetch(`http://localhost:9000/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          id: res.id,
          value: res.value,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
