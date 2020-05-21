export const ADD_CATEGORY = 'ADD_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const getCategories = (dispatch, userID) => {
  fetch(`http://localhost:9000/category/${userID}`)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_CATEGORIES,
        payload: [
          ...res.data.map((c) => ({
            id: c._id,
            value: c.value,
            key: c.key,
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
      key: data.key,
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
            key: res.key,
          },
        });
      }
      // console.log(res);
    });
};

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});
