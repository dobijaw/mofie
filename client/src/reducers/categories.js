import {
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
} from 'actions/categories';

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return [action.payload, ...state];
    case GET_CATEGORIES_SUCCESS:
      return action.payload;
    case UPDATE_CATEGORY_SUCCESS:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, value: action.payload.value } : item,
      );
    case DELETE_CATEGORY_SUCCESS:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export default categoriesReducer;
