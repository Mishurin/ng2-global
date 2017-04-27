import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, NgForm } from '@angular/forms'
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
    public isLoginError: boolean = false

    constructor(
        private auth: AuthService, 
        private router: Router, 
        private loader: LoaderService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe()
    }

    login(event: any, form: NgForm) {
        event.preventDefault()
        this.loader.show()
        this.loginSubscription = this.auth.login(
            form.controls['username'].value, 
            form.controls['password'].value).subscribe(() => {
            this.router.navigate(['/'])
            this.loader.hide()
            this.isLoginError = false
            this.cd.markForCheck()
        }, this.handleLoginError.bind(this))
    }


    handleLoginError() {
        this.loader.hide()
        this.isLoginError = true
        this.cd.markForCheck()
    }

    isSubmitButtonDisabled(form: NgForm): boolean {
        return form.invalid
    }

    isRequiredErrorShouldBeShown(ctrl: FormControl) {
        return ctrl.touched && ctrl.invalid && ctrl.errors['required']
    }

}
