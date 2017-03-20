import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../common/index'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private username: string
    private password: string

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
    }

    login(username: string) {
        this.auth.login(username)
        this.router.navigate(['/'])
    }

}
