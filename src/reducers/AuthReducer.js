import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = { user: null, loading: false, error: '', token: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: false, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: '',
        loading: false
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case LOGOUT_USER:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
