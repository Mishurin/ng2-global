import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService, User } from '../../common/index'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.auth.getAuthStream().subscribe(() => {
            this.runCheck()
        })
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
