import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { User } from '../common/index'

import { Observable, ReplaySubject } from 'rxjs/Rx'

import { } from '../../environments/'
import { getEntry, ENTRY_POINTS } from '../app.config'

export interface AppToken {
    token: string
}

interface LocalStorage {
    getItem(token: string): string
    setItem(token: string, value: string)
    removeItem(token: string): string
}

declare var localStorage: LocalStorage

@Injectable()
export class AuthService {

    private isAuthStream: ReplaySubject<boolean> = new ReplaySubject<boolean>()

    constructor(private http: Http) { }

    getAuthStream(): Observable<boolean> {
        return this.isAuthStream.asObservable()
    }

    getUserInfo(): User {
        return User.toObject(localStorage.getItem(User.token));
    }

    isAuthenticated(): boolean {
        return Boolean(this.getUserInfo())
    }

    login(name: string, password: string) {
        let body = {
            user: name,
            password: password
        }
        let opts = new RequestOptions()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        opts.headers = headers
        this.http.post(getEntry(ENTRY_POINTS.LOGIN), body, opts)
            .map((response: Response) => <AppToken>response.json())
            .subscribe((data) => {
                localStorage.setItem(User.token, data.token)
                this.isAuthStream.next(Boolean(this.getUserInfo()))
            }, (e) => {
                console.log('Error:', e)
            })
    }

    logout() {
        localStorage.removeItem(User.token)
        this.isAuthStream.next(Boolean(this.getUserInfo()))
    }
}
