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
        return User.toObject(localStorage.getItem(User.tokenKey));
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
        return this.http.post(getEntry(ENTRY_POINTS.LOGIN), body, opts)
            .map((response: Response) => {
                let data = <AppToken>response.json()
                localStorage.setItem(User.tokenKey, JSON.stringify(data))
                this.isAuthStream.next(Boolean(this.getUserInfo()))
            }).catch(this.handleLoginError)
    }

    handleLoginError(err: any) {
        console.log('sever error:', err);
        if (err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    logout() {
        localStorage.removeItem(User.tokenKey)
        this.isAuthStream.next(Boolean(this.getUserInfo()))
    }
}
