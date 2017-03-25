import { Injectable } from '@angular/core'

import { User } from '../common/index'

import { Observable, Subject } from 'rxjs/Rx'

interface LocalStorage {
    getItem(token: string): string
    setItem(token: string, value: string)
    removeItem(token: string): string
}

declare var localStorage: LocalStorage

@Injectable()
export class AuthService {

    private isAuthStream: Subject<boolean> = new Subject<boolean>()

    constructor() { }

    getAuthStream(): Observable<boolean> {
        return this.isAuthStream.asObservable()
    }

    getUserInfo(): User {
         return User.toObject(localStorage.getItem(User.token));
    }

    isAuthenticated(): boolean {
        return Boolean(this.getUserInfo())
    }

    login(name: string) {
        localStorage.setItem(User.token, new User(name).toString())
        this.isAuthStream.next(Boolean(this.getUserInfo()))
    }

    logout() {
        localStorage.removeItem(User.token)
        this.isAuthStream.next(Boolean(this.getUserInfo()))
    }
}
