import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { DetailsComponent, CoursesService, Author, AuthorVM, CourseItem } from '../common/index'


@Component({
    selector: 'app-add-course',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class AddCourseComponent extends DetailsComponent {

    constructor(
        protected courseSrv: CoursesService,
        protected router: Router,
        protected fb: FormBuilder,
        private aRoute: ActivatedRoute
    ) {
        super(courseSrv, router, fb)
    }

    ngOnInit() {
        super.ngOnInit()
        this.aRoute.data.subscribe((data) => {
            let authors = <Author[]>data[0]
            this.createForm.controls.authors.setValue(authors, { onlySelf: true })
        })
    }

    submit(e: any, createForm: FormGroup) {
        
        super.submit(e, createForm)

        let newCourse: CourseItem = {
            name: createForm.controls.name.value,
            date: new Date(createForm.controls.date.value),
            duration: +createForm.controls.duration.value,
            description: createForm.controls.description.value,
            authors: <Author[]>createForm.controls.authors.value.filter((item: AuthorVM) => item.selected).map((item: AuthorVM) => {
                return <Author>{
                    firstName: item.firstName,
                    lastName: item.lastName,
                    id: item.id
                }
            }),
        }

        this.courseSrv.createCourse(newCourse).subscribe(() => {
            this.goToHomePage()
        })
    }
}
