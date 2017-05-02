import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { HttpModule } from '@angular/http'
import { Component } from '@angular/core'
import { Subscription, Observable } from 'rxjs/Rx'
import { CommonModule } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'

import { AppCommonModule } from '../../common/index'

import { HeaderComponent } from './header.component'
import { LogoComponent, BreadcrumbsService } from '../index'
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component'
import { AuthService } from '../../common/index'

class MockAuthService {
    subscr: Subscription
    content
    error

    constructor() {
        this.subscr = new Subscription()
    }

    getUserInfo(username: string, password: string) {
        return Observable.of([])
    }

    getAuthStream() {
        return this
    }

    isAuthenticated() {
        return true
    }

    subscribe(next, error) {
        next()
        return this.subscr
    }

    logout() {
        return this.subscr
    }
}

@Component({
    selector: 'blank',
    template: ''
})
class BlankComponent {

}

@Component({
    selector: 'app-logo',
    template: ''
})
class MockLogoComponent {

}

@Component({
    selector: 'app-breadcrumbs',
    template: ''
})
class MockBreadCrumbsComponent {

}

describe('HeaderComponent', () => {
    let component: HeaderComponent
    let fixture: ComponentFixture<HeaderComponent>
    let authService: AuthService
    let router: Router

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppCommonModule, HttpModule, CommonModule, RouterTestingModule.withRoutes([{ path: '', component: BlankComponent }])],
            declarations: [HeaderComponent, LogoComponent, BreadcrumbsComponent, BlankComponent],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                BreadcrumbsService
            ]
        })
            .overrideComponent(LogoComponent, MockLogoComponent)
            .overrideComponent(BreadcrumbsComponent, MockBreadCrumbsComponent)
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
