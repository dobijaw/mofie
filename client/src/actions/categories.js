export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload,
});

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});
