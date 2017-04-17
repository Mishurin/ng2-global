import { TestBed, inject } from '@angular/core/testing'
import { Observable } from 'rxjs/Rx'
import { HttpModule } from '@angular/http'

import { AuthService } from './auth.service'

import { User } from '../common/index'

declare var localStorage: any

describe('AuthService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [AuthService]
        })
    })

    beforeEach(() => {
        localStorage.removeItem(User.token)
    })

    it('should be initialized', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy()
    }))

    it('should return observable stream', inject([AuthService], (service: AuthService) => {
        expect(service.getAuthStream() instanceof Observable).toBeTruthy()
    }))

    it('should return user data', inject([AuthService], (service: AuthService) => {
        let user = new User('Dude')
        localStorage.setItem(User.token, user.toString())
        expect(service.getUserInfo().name).toBe(user.name)
    }))

    it('should be authorized if user data exist', inject([AuthService], (service: AuthService) => {
        let getUserInfo = spyOn(service, 'getUserInfo').and.callFake(() => true)
        expect(service.isAuthenticated()).toBeTruthy()
        expect(getUserInfo).toHaveBeenCalled()
    }))

    it('should be not authorized if user data doesn\'t exist', inject([AuthService], (service: AuthService) => {
        let getUserInfo = spyOn(service, 'getUserInfo').and.callFake(() => false)
        expect(service.isAuthenticated()).toBeFalsy()
        expect(getUserInfo).toHaveBeenCalled()
    }))

    it('should login user', inject([AuthService], (service: AuthService) => {
        let userName = 'Dude'
        let password = '123'
        expect(service.isAuthenticated()).toBeFalsy()
        service.login(userName, password)
        expect(User.toObject(localStorage.getItem(User.token)).name).toBe(userName)
        expect(service.isAuthenticated()).toBeTruthy()
    }))

    it('should logout user', inject([AuthService], (service: AuthService) => {
        let userName = 'Dude'
        let password = '123'
        service.login(userName, password)
        expect(service.isAuthenticated()).toBeTruthy()
        service.logout()
        expect(service.isAuthenticated()).toBeFalsy()
    }))

})
