import { TestBed, inject, async } from '@angular/core/testing'
import { Observable } from 'rxjs/Rx'
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'
import { Store } from '@ngrx/store'

import { AuthService } from '../services/auth.service'
import { AuthorizedHttpService } from '../services/authorized-http.service'
import { User } from '../entities/index'
import { AppStore } from '../reducers/index'


class MockStore {
    dispatch() {}
}

declare var localStorage: any

describe('AuthService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                AuthService,
                {
                    provide: AuthorizedHttpService, useFactory: (backend, options) => {
                        return new AuthorizedHttpService(backend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: Http, useFactory: (backend, options) => {
                        return new Http(backend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: Store, useClass: MockStore
                },
                MockBackend,
                BaseRequestOptions
            ]
        })
    })

    beforeEach(() => {
        localStorage.removeItem(User.tokenKey)
    })

    it('should be initialized', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy()
    }))

    it('should return observable stream', inject([AuthService], (service: AuthService) => {
        expect(service.getAuthStream() instanceof Observable).toBeTruthy()
    }))

    it('should return token data', inject([AuthService], (service: AuthService) => {
        let user = new User('dude_token')
        localStorage.setItem(User.tokenKey, user.toString())
        expect(service.getToken().token).toBe(user.token)
    }))

    it('should be authorized if token data exist', inject([AuthService], (service: AuthService) => {
        let getToken = spyOn(service, 'getToken').and.callFake(() => true)
        expect(service.isAuthenticated()).toBeTruthy()
        expect(getToken).toHaveBeenCalled()
    }))

    it('should be not authorized if token data doesn\'t exist', inject([AuthService], (service: AuthService) => {
        let getToken = spyOn(service, 'getToken').and.callFake(() => false)
        expect(service.isAuthenticated()).toBeFalsy()
        expect(getToken).toHaveBeenCalled()
    }))

    it('should login user', async(inject([MockBackend, AuthService], (backend: MockBackend, service: AuthService) => {
        let userName = 'dude'
        let password = '123'
        let token = 'dude_token'
        backend.connections.subscribe((connection: MockConnection) => {
            {
                let ops = new ResponseOptions({ body: { token: token } });
                connection.mockRespond(new Response(ops));
            }
        })
        expect(service.isAuthenticated()).toBeFalsy()
        service.login(userName, password).subscribe(response => {
            expect(User.toObject(localStorage.getItem(User.tokenKey)).token).toBe(token)
            expect(service.isAuthenticated()).toBeTruthy()
        })
    })))

    it('should logout user', async(inject([MockBackend, AuthService], (backend: MockBackend, service: AuthService) => {
        let userName = 'dude'
        let password = '123'
        let token = 'dude_token'
        backend.connections.subscribe((connection: MockConnection) => {
            {
                let ops = new ResponseOptions({ body: { token: token } });
                connection.mockRespond(new Response(ops));
            }
        })
        service.login(userName, password).subscribe(response => {
            expect(service.isAuthenticated()).toBeTruthy()
            service.logout()
            expect(service.isAuthenticated()).toBeFalsy()
        })
    })))

})
