import { SET_USER, SET_TOKEN, LOGIN, LOGOUT } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.data };
        case SET_TOKEN:
            return { ...state, token: action.data };
        case LOGIN:
            return { ...state, user: action.user, token: action.token };
        case LOGOUT:
            return { ...state, user: null, token: null };
        default:
            return state;
    }
}