import { Action } from '@ngrx/store'

import { UserState } from '../index'

export const LOGIN_SUCCESS = '[User] Login Success'
export const LOGOUT = '[User] Logout'

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS
}

export class LogoutAction implements Action {
    readonly type = LOGOUT
}

export type UserActions
    = LoginSuccessAction
    | LogoutAction