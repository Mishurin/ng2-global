import { userReducer, userInitialState } from './user.reducer'
import { UserInfo } from '../index'

import * as actions from '../actions/user.actions'

describe('UserReducer', () => {
    it('should return default state for undefined action', () => {
        const action: any = {}
        const undefinedState = undefined
        const result = userReducer(undefinedState, action)
        expect(result).toBe(userInitialState)
    })

    it('LOGIN action', () => {
        const action = new actions.LoginAction()
        const result = userReducer(userInitialState, action)
        expect(result.isAuthorized).toBe(true)
        expect(result.data).toEqual(userInitialState.data)
    })

    it('LOGIN_SUCCESS action', () => {
        const action = new actions.LoginSuccessAction()
        const result = userReducer(userInitialState, action)
        expect(result.isAuthorized).toBe(true)
        expect(result.data).toEqual(userInitialState.data)
    })

    it('LOGOUT action', () => {
        const action = new actions.LogoutAction()
        const result = userReducer(userInitialState, action)
        expect(result.isAuthorized).toBe(false)
        expect(result.data).toEqual(userInitialState.data)
    })

    it('LOAD_USER_DATA_SUCCESS action', () => {
        const userInfo = new UserInfo('dude');
        const action = new actions.LoadUserDataSuccessAction(userInfo)
        const result = userReducer(userInitialState, action)
        expect(result.isAuthorized).toBe(userInitialState.isAuthorized)
        expect(result.data).toEqual(userInfo)
    })
})