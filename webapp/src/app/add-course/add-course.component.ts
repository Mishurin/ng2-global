import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { CoursesService, CourseItem, Author, authorsRequiredValidator } from '../common/index'



@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    createForm: FormGroup

    authors: Author[] = [
        {
            name: 'Author1',
            selected: false,
            id: 'a1'
        },
        {
            name: 'Author2',
            selected: false,
            id: 'a2'
        }
    ]

    constructor(
        private courseSrv: CoursesService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            date: ['', [Validators.required, Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)]],
            duration: ['', [Validators.required, Validators.pattern(/[0-9]/g)]],
            authors: [this.authors, [authorsRequiredValidator]]
        })
    }

    submit(e: any, createForm: FormGroup) {
        e.preventDefault();
        
        let newCourse = {
            name: createForm.controls.name.value,
            date: new Date(createForm.controls.date.value),
            duration: +createForm.controls.duration.value,
            description: createForm.controls.description.value,
            authors: createForm.controls.authors.value.filter((item: Author) => item.selected).map((item: Author) => item.name),
        }

        this.courseSrv.createCourse(newCourse).subscribe(() => {
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

    isPatternMessageShouldBeShown(ctrl: FormControl): boolean {
        return ctrl.touched && ctrl.invalid && ctrl.errors['pattern']
    }
}
