const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const ADD_TO_COLLECTION = 'ADD_TO_COLLECTION';

const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload,
});

const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});

const addToCllection = (payload) => ({
  type: ADD_TO_COLLECTION,
  payload,
});

export {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_TO_COLLECTION,
  addCategory,
  deleteCategory,
  addToCllection,
};
