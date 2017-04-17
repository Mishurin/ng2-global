import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { HttpModule } from '@angular/http'

import { AppCommonModule } from '../../common/index'

import { HeaderComponent } from './header.component'
import { LogoComponent } from '../index'
import { AuthService } from '../../common/index'

class MockRouter {
    navigate() {}
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

    it('should return user info', () => {
        let result = 'user_data'
        spyOn(authService, 'getUserInfo').and.callFake(() => result)
        expect(component.getUserInfo()).toBe(result)
    })

    it('should return auth status', () => {
        let result = true
        spyOn(authService, 'isAuthenticated').and.callFake(() => result)
        expect(component.isAuth()).toBeTruthy()
    })

    it('should logout', () => {
        let logout = spyOn(authService, 'logout').and.stub()
        let navigate = spyOn(router, 'navigate')

        component.logout()

        expect(logout).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith(['/login'])
    })

    it('should unsubscribe component from auth events', () => {
        let unsubscribe = spyOn(component.authSubscription, 'unsubscribe')
        component.ngOnDestroy()
        expect(unsubscribe).toHaveBeenCalled()
    })
})
