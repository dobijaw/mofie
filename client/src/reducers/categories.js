import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
} from 'actions/categories';

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [action.payload, ...state];
    case DELETE_CATEGORY:
      return state.filter((item) => item.id !== action.payload.id);
    case GET_CATEGORIES:
      return action.payload;
    case UPDATE_CATEGORY:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, value: action.payload.value } : item,
      );
    default:
      return state;
  }
};

export default categoriesReducer;
