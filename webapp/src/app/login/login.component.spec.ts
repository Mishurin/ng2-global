import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

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


describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>
    let auth: AuthService
    let router: Router

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginComponent],
            providers: [
                AuthService,
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
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should log in', fakeAsync(() => {
        let username = 'Dude'
        let login = spyOn(auth, 'login')
        let navigate = spyOn(router, 'navigate')

        component.login(username)

        tick(2000)

        expect(login).toHaveBeenCalledWith(username)
        expect(navigate).toHaveBeenCalledWith(['/'])
    }))
})
