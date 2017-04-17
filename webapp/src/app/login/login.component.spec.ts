import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpModule } from '@angular/http'
import { Subscription } from 'rxjs/Rx'

import { LoginComponent } from './login.component'

import { AuthService } from '../common/index'
import { LoaderService } from '../base/index'

class MockRouter {
    navigate() { }
}

class MockLoaderService {
    show() { }
    hide() { }
}

class MockAuthService {
    loginSubscription: Subscription
    content
    error

    constructor() {
        this.loginSubscription = new Subscription()
    }

    login(username: string, password: string) {
        return this
    }

    subscribe(next, error) {
        next()
        return this.loginSubscription
    }
}

describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>
    let auth: AuthService
    let router: Router
    let loader: LoaderService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpModule],
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter },
                { provide: LoaderService, useClass: MockLoaderService }
            ]
        })
            .compileComponents()

    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        auth = TestBed.get(AuthService)
        router = TestBed.get(Router)
        loader = TestBed.get(LoaderService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should log in', fakeAsync(() => {
        let username = 'Dude'
        let password = '123'
        let login = spyOn(auth, 'login').and.callThrough()
        let navigate = spyOn(router, 'navigate')
        let showLoader = spyOn(loader, 'show')
        let hideLoader = spyOn(loader, 'hide')
        component.login(username, password)
        expect(showLoader).toHaveBeenCalled()
        expect(login).toHaveBeenCalledWith(username, password)

        tick(1000)

        expect(navigate).toHaveBeenCalledWith(['/'])
        expect(hideLoader).toHaveBeenCalled()
    }))

    it('should unsubscribe component from login events', fakeAsync(() => {
        let username = 'Dude'
        let password = '123'
        
        // Should create a subscriber before
        component.login(username, password)

        tick(1000)
        let unsubscribe = spyOn(component.loginSubscription, 'unsubscribe')

        component.ngOnDestroy()
        expect(unsubscribe).toHaveBeenCalled()
    }))
})
