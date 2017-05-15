import { UserInfo } from './user.model'

export interface UserState {
    isAuthorized: boolean
    data: UserInfo
}