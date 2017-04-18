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
    userInfoSubscription: Subscription
    userInfo: UserInfo = null

    constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.authSubscription = this.auth.getAuthStream().subscribe(() => {
            this.runCheck()
        })
        this.userInfoSubscription = this.auth.getUserInfo().subscribe((data) => {
            this.userInfo = data
            this.runCheck()
        })
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe()
        this.userInfoSubscription.unsubscribe()
    }

    isUserInfoShoudBeShown(): boolean {
        return this.auth.isAuthenticated() && !!this.userInfo
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/login'])
    }

    runCheck() {
        this.cd.markForCheck()
    }

}
