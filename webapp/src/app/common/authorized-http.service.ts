import { Injectable } from '@angular/core'
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Rx'

import { User } from './index'

declare var localStorage: any

@Injectable()
export class AuthorizedHttpService extends Http {

    constructor(backend: XHRBackend, options: RequestOptions) {
        let token = localStorage.getItem(User.tokenKey)
        options.headers.set('Authorization', `Bearer ${token}`)
        super(backend, options)
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = localStorage.getItem(User.tokenKey)
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new Headers() }
            }
            options.headers.set('Authorization', `Bearer ${token}`)
        } else {
            url.headers.set('Authorization', `Bearer ${token}`)
        }
        return super.request(url, options).catch(this.catchAuthError(this))
    }

    private catchAuthError(self: AuthorizedHttpService) {
        return (res: Response) => {
            console.log(res)
            if (res.status === 401 || res.status === 403) {
                console.log(res)
            }
            return Observable.throw(res)
        }
    }
}
