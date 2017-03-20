import { TestBed, async, inject } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'

import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

describe('AuthGuard', () => {
    let auth: AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthService, AuthGuard]
        })
    })

    beforeEach(() => {
        auth = TestBed.get(AuthService)
    })

    it('should be initialized', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy()
    }))

    it('should be activated', inject([AuthGuard, Router], (guard: AuthGuard, router: Router) => {
        spyOn(router, 'navigate')
        spyOn(auth, 'isAuthenticated').and.callFake(() => true)

        expect(guard.canActivate(null, null)).toBeTruthy()
        expect(router.navigate).not.toHaveBeenCalled()
    }))

    it('should be not activated', inject([AuthGuard, Router], (guard: AuthGuard, router: Router) => {
        spyOn(router, 'navigate');
        spyOn(auth, 'isAuthenticated').and.callFake(() => false)
        expect(guard.canActivate(null, null)).toBeFalsy()
        expect(router.navigate).toHaveBeenCalled()
    }))

})
