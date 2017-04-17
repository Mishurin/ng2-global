import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx'

import { AuthService } from '../common/index'
import { LoaderService } from '../base/index'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

    private username: string
    private password: string
    public loginSubscription: Subscription

    constructor(private auth: AuthService, private router: Router, private loader: LoaderService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe()
    }

    login(username: string, password: string) {
        this.loader.show()
        this.loginSubscription = this.auth.login(username, password).subscribe(() => {
            this.router.navigate(['/'])
            this.loader.hide()
        })
    }

}
