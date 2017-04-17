import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../common/index'
import { LoaderService } from '../base/index'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    private username: string
    private password: string

    constructor(private auth: AuthService, private router: Router, private loader: LoaderService) { }

    ngOnInit() {
    }

    login(username: string, password: string) {
        this.auth.login(username, password)
        this.loader.show();
        setTimeout(() => {
            this.router.navigate(['/'])
            this.loader.hide()
        }, 1000)
        
    }

}
