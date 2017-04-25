import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { CoursesService, CourseItem } from '../common/index'

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    createForm: FormGroup

    constructor(
        private courseSrv: CoursesService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            date: ['', [Validators.required]],
            duration: ['', [Validators.required]],
            authors: ['', [Validators.required]]
        })
    }

    save(course: CourseItem) {
        this.courseSrv.createCourse({
            name: course.name,
            date: new Date(),
            duration: 30,
            description: course.description
        }).subscribe(() => {
            this.router.navigate(['/'])
        })
    }

    cancel() {
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

}
