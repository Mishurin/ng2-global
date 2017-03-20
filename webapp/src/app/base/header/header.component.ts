import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../common/index'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
    }

    getUserInfo() {
        return this.auth.getUserInfo()
    }

    isAuth() {
        return this.auth.isAuthenticated()
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/login'])
    }

}
