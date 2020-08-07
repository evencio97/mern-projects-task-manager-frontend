import React, { useReducer } from 'react';
import appContext from './AppContext';
import appReducer from './AppReducer';
import { SET_LOADING, SET_USER, SET_TOKEN } from '../../types';

const AppState = props => {
    const initialState = {
        loading: false,
        user: { name: "Evencio", lastname: "Hernández", email: "dev.evenciohernandez@gmail.com" },
        token: null
    }

    // Dispatch for exec actions
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Loading
    const setLoading = (data) => {
        dispatch({ type: SET_LOADING, data: true })
    }
    // User
    const setUser = (data) => {
        dispatch({ type: SET_USER, data: data })
    }
    // Token
    const setToken = (data) => {
        dispatch({ type: SET_TOKEN, data: data })
    }

    return (
        <appContext.Provider value={{
            loading: state.loading,
            user: state.user,
            setLoading,
            setUser,
            setToken
        }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppState;