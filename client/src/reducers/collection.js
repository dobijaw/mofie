export const ADD_TO_COLLECTION = 'ADD_TO_COLLECTION';
export const REMOVE_FROM_COLLECTION = 'REMOVE_FROM_COLLECTION';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      return [
        action.payload,
        ...state.filter((item) => item.id !== action.payload.id),
      ];
    case REMOVE_FROM_COLLECTION:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default collectionReducer;
