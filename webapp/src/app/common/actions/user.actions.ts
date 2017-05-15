import { Action } from '@ngrx/store'

import { UserState, UserInfo } from '../index'

export const LOGIN = '[User] Login'
export const LOGIN_SUCCESS = '[User] Login Success'
export const LOGOUT = '[User] Logout'
export const LOAD_USER_DATA_SUCCESS = '[User] Load data Success'

export class LoginAction implements Action {
    readonly type = LOGIN
}

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS
}

export class LogoutAction implements Action {
    readonly type = LOGOUT
}

export class LoadUserDataSuccessAction implements Action {
    readonly type = LOAD_USER_DATA_SUCCESS
    constructor(public payload: UserInfo) {}
}

export type UserActions
    = LoginAction
    | LoginSuccessAction
    | LogoutAction
    | LoadUserDataSuccessAction