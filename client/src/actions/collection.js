export const ADD_TO_COLLECTION = 'ADD_TO_COLLECTION';
export const GET_COLLECTION = 'GET_COLLECTION';
export const REMOVE_FROM_COLLECTION = 'REMOVE_FROM_COLLECTION';

export const addToCllection = (dispatch, data) => {
  fetch('http://localhost:9000/production/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.warning) return;

      dispatch({
        type: ADD_TO_COLLECTION,
        payload: res.production,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCollection = (dispatch, userID) => {
  fetch(`http://localhost:9000/production/${userID}`)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_COLLECTION,
        payload: res.collection,
      });
    });
};

export const removeFromCollection = (dispatch, _id) => {
  fetch(`http://localhost:9000/production/${_id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: REMOVE_FROM_COLLECTION,
        payload: {
          _id,
        },
      });
    });
};
