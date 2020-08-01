import React, { useReducer } from 'react';
import appContext from './AppContext';
import appReducer from './AppReducer';
import { SET_LOADING, SET_USER } from '../../types';

const AppState = props => {
    const initialState = {
        loading: false,
        user: { name: "Evencio", lastname: "Hernández", email: "dev.evenciohernandez@gmail.com" }
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

    return (
        <appContext.Provider value={{
            loading: state.loading,
            user: state.user,
            setLoading,
            setUser
        }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppState;