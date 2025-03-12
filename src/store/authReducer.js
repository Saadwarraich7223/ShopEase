const LOGIN = "login";
const LOGOUT = "logout";

const initialState = {
  status: false,
  userData: null,
};

export function login(userData) {
  return { type: LOGIN, payload: userData };
}
export function logout() {
  return { type: LOGOUT };
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, status: true, userData: action.payload };
    case LOGOUT:
      return { ...state, status: false, userData: null };
    default:
      return state;
  }
}
