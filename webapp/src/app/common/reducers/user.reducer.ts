import { UserState, UserActions } from '../index'

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGOUT,
    LOAD_USER_DATA_SUCCESS
} from '../index'


const initialState: UserState = {
    isAuthorized: false,
    data: null
}

export function userReducer(state:UserState = initialState, action: UserActions): UserState {
    switch(action.type) {
        case LOGIN: {
            return {
                isAuthorized: true,
                data: state.data
            }
        }
        case LOGIN_SUCCESS: {
            return {
                isAuthorized: true,
                data: state.data
            }
        }
        case LOGOUT: {
            return {
                isAuthorized: false,
                data: null
            }
        }
        case LOAD_USER_DATA_SUCCESS: {
            return {
                isAuthorized: state.isAuthorized,
                data: action.payload
            }
        }
        default: {
            return state;
        }
    }
}