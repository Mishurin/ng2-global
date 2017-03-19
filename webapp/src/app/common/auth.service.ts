import { Injectable } from '@angular/core'

import { User } from '../common/index'

interface LocalStorage {
    getItem(token: string): string
    setItem(token: string, value: string)
    removeItem(token: string): string
}

declare var localStorage: LocalStorage

@Injectable()
export class AuthService {


    constructor() { }

    isAuthenticated(): boolean {
        return Boolean(this.getUserInfo())
    }

    getUserInfo(): User {
         return User.toObject(localStorage.getItem(User.token));
    }


    login(name: string) {
        localStorage.setItem(User.token, new User(name).toString())
    }

    logout() {
        localStorage.removeItem(User.token)
    }
}
