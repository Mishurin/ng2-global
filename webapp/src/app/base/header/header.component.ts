import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx'

import { AuthService, User, UserInfo } from '../../common/index'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeaderComponent implements OnInit, OnDestroy {

    authSubscription: Subscription
    userInfo: UserInfo

    constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.authSubscription = this.auth.getAuthStream().subscribe(() => {
            if (this.isAuth()) {
                return this.auth.getUserInfo().subscribe((data) => {
                    this.userInfo = data
                    this.runCheck()
                })
            }
            this.runCheck()
        })
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe()
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
