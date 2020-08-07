import { SET_LOADING, SET_USER } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, loading: action.data};
        case SET_USER:
            return { ...state, user: action.data };
        case SET_TOKEN:
            return { ...state, token: action.data };
        default:
            return state;
    }
}