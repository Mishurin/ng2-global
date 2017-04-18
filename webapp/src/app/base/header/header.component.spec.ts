import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { HttpModule } from '@angular/http'
import { Subscription } from 'rxjs/Rx'

import { AppCommonModule } from '../../common/index'

import { HeaderComponent } from './header.component'
import { LogoComponent } from '../index'
import { AuthService } from '../../common/index'

class MockRouter {
    navigate() { }
}

class MockAuthService {
    loginSubscription: Subscription
    content
    error

    constructor() {
        this.loginSubscription = new Subscription()
    }

    getUserInfo(username: string, password: string) {
        return this
    }

    getAuthStream() {
        return this
    }

    subscribe(next, error) {
        next()
        return this.loginSubscription
    }
}

describe('HeaderComponent', () => {
    let component: HeaderComponent
    let fixture: ComponentFixture<HeaderComponent>
    let authService: AuthService
    let router: Router

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppCommonModule, HttpModule],
            declarations: [HeaderComponent, LogoComponent],
            providers: [{ provide: Router, useClass: MockRouter }]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent)
        component = fixture.componentInstance
        authService = TestBed.get(AuthService)
        router = TestBed.get(Router)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('shoud emit check if component is changed', () => {
        let runCheck = spyOn(component, 'runCheck')
        authService.logout()
        expect(runCheck).toHaveBeenCalled()
    })

    it('should define whether info block should be shown', () => {
        let result = true
        spyOn(authService, 'isAuthenticated').and.callFake(() => result)
        component.userInfo = { name: 'Dude ' }
        expect(component.isUserInfoShoudBeShown()).toBeTruthy()
        component.userInfo = null
        expect(component.isUserInfoShoudBeShown()).toBeFalsy()
    })

    it('should logout', () => {
        let logout = spyOn(authService, 'logout').and.stub()
        let navigate = spyOn(router, 'navigate')

        component.logout()

        expect(logout).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith(['/login'])
    })

    it('should unsubscribe component from auth events', () => {
        let unsubscribe1 = spyOn(component.authSubscription, 'unsubscribe')
        let unsubscribe2 = spyOn(component.userInfoSubscription, 'unsubscribe')
        component.ngOnDestroy()
        expect(unsubscribe1).toHaveBeenCalled()
        expect(unsubscribe1).toHaveBeenCalled()
    })
})
