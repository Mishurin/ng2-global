import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx'

import { AuthService, User } from '../../common/index'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeaderComponent implements OnInit, OnDestroy {

    authSubscription: Subscription

    constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.authSubscription = this.auth.getAuthStream().subscribe(() => {
            this.runCheck()
        })
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe()
    }

    getUserInfo(): User {
        return this.auth.getUserInfo()
    }

    isAuth(): boolean {
        return this.auth.isAuthenticated()
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/login'])
    }

    runCheck() {
        this.cd.markForCheck()
    }

}
