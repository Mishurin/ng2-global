import { UserState, UserActions } from '../index'

import {
    LOGIN_SUCCESS,
    LOGOUT
} from '../index'


const initialState: UserState = {
    isAuthorized: false,
    data: null
}

export function userReducer(state:UserState = initialState, action: UserActions): UserState {
    switch(action.type) {
        case LOGIN_SUCCESS: {
            return state
        }
        case LOGOUT: {
            return state
        }
        default: {
            return state;
        }
    }
}