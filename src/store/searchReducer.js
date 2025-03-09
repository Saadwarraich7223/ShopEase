const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
}
export default function searchReducer(state = "", action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return action.payload;

    default:
      return state;
  }
}
