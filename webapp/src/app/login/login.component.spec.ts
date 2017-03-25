import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { LoginComponent } from './login.component'

import { AuthService } from '../common/index'

class MockRouter {
    navigate() { }
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
            providers: [AuthService, { provide: Router, useClass: MockRouter }]
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

    it('should log in', () => {
        let username = 'Dude'
        let login = spyOn(auth, 'login')
        let navigate = spyOn(router, 'navigate')

        component.login(username)

        expect(login).toHaveBeenCalledWith(username)
        expect(navigate).toHaveBeenCalledWith(['/'])
    })
})
