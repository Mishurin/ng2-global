import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx'
import { Store } from '@ngrx/store'

import { AuthService, User, UserInfo, AppStore, UserState } from '../../common/index'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeaderComponent implements OnInit, OnDestroy {

    userInfoSubscription: Subscription
    storeSubscription: Subscription
    userInfo: UserInfo = null
    isAuthorized: boolean = null

    constructor(
        private auth: AuthService, 
        private router: Router, 
        private cd: ChangeDetectorRef,
        private store: Store<AppStore>
        ) { }

    ngOnInit() {
        this.storeSubscription = this.store.select<UserState>('user').subscribe((userState)=> {
            this.userInfo = userState.data
            this.isAuthorized = userState.isAuthorized
            if(userState.isAuthorized && !this.userInfo) {
                this.userInfoSubscription = this.auth.getUserInfo().subscribe()
            }
            this.runCheck()
        })
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
        this.userInfoSubscription.unsubscribe()
    }

    isUserInfoShoudBeShown(): boolean {
        return this.isAuthorized && !!this.userInfo
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/login'])
    }

    runCheck() {
        this.cd.markForCheck()
    }

}
