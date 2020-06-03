export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';

export const addCategory = async (dispatch, { userId, value }) => {
  const response = await fetch('http://localhost:9000/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      value,
    }),
  });

  const res = await response.json();

  try {
    if (!res.warning) {
      dispatch({
        type: ADD_CATEGORY_SUCCESS,
        payload: {
          id: res._id,
          value: res.value,
        },
      });

      return {
        id: res._id,
        value: res.value,
      };
    }
    console.log(res.warning);
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = (dispatch, userId) => {
  fetch(`http://localhost:9000/category/${userId}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: [
          ...res.categories.reverse().map((c) => ({
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

export const updateCategory = async (dispatch, { categoryId, value }) => {
  const response = await fetch(`http://localhost:9000/category/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value,
    }),
  });

  const res = await response.json();

  try {
    if (!res.warning) {
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: {
          id: res._id,
          value: res.value,
        },
      });

      return {
        id: res._id,
        value: res.value,
      };
    }
    console.log(res.warning);
  } catch (e) {
    console.log(e);
  }
};

export const deleteCategory = (dispatch, categoryId) => {
  fetch(`http://localhost:9000/category/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: {
          id: res._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
