import React, { createContext, useReducer } from 'react';
import { userReducer} from '../reducers/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, {
        isAuthenticated: false,
        loading: false,
        loginMethod: '',
        userData: {},
        errorData: {},
    });

    return (
        <UserContext.Provider value={{user, userDispatch}}>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;