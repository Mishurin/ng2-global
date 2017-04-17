import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { User, UserInfo } from '../common/index'

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

    getUserInfo(): Observable<UserInfo> {
        let opts = new RequestOptions()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        opts.headers = headers
        return this.http.get(getEntry(ENTRY_POINTS.USER_INFO), opts)
            .map((response: Response) => {
                return <UserInfo>response.json()
            }).catch(this.handleError)
    }

    isAuthenticated(): boolean {
        return Boolean(this.getToken())
    }

    getToken(): AppToken {
        return <AppToken>JSON.parse(localStorage.getItem(User.tokenKey))
    }

    login(name: string, password: string): Observable<AppToken> {
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
                this.isAuthStream.next(Boolean(this.getToken()))
            }).catch(this.handleError)
    }

    handleError(err: any) {
        console.log('sever error:', err);
        if (err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    logout() {
        localStorage.removeItem(User.tokenKey)
        this.isAuthStream.next(Boolean(this.getToken()))
    }
}
