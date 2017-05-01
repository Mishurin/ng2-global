import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { CoursesService, CourseItem, Author, authorsRequiredValidator } from '../../index'
import { ROUTES } from '../../../app.config'

@Component({
    selector: 'details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    protected createForm: FormGroup

    constructor(
        protected courseSrv: CoursesService,
        protected router: Router,
        protected fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            date: ['', [Validators.required, Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)]],
            duration: ['', [Validators.required, Validators.pattern(/[0-9]/g)]],
            authors: [[], [authorsRequiredValidator]]
        })
    }

    submit(e: any, createForm: FormGroup) {
       e.preventDefault()
    }

    cancel() {
        this.createForm.reset()
    }

    isSubmitButtonDisabled(): boolean {
        return this.createForm.invalid
    }

    isRequiredErrorShouldBeShown(ctrl: FormControl): boolean {
        return ctrl.touched && ctrl.invalid && ctrl.errors['required']
    }

    isMaxLengthMessageShouldBeShown(ctrl: FormControl): boolean {
        return ctrl.touched && ctrl.invalid && ctrl.errors['maxlength']
    }

    isPatternMessageShouldBeShown(ctrl: FormControl): boolean {
        return ctrl.touched && ctrl.invalid && ctrl.errors['pattern']
    }

    goToHomePage() {
        this.router.navigate([ROUTES.HOME])
    }
}
