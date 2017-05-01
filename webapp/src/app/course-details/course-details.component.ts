import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DatePipe } from '@angular/common'

import { CoursesService, CourseItem, DetailsComponent, Author, AuthorVM } from '../common/index'

@Component({
    selector: 'course-details',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class CourseDetailsComponent extends DetailsComponent {

    course: CourseItem

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
            // TODO: change interface of Author and merge with item authors array
            let authors = <Author[]>data[0]
            let course = <CourseItem>data[1]
            this.course = course

            this.createForm.setValue({
                name: course.name,
                description: course.description,
                date: new DatePipe('en-US').transform(new Date(course.date), 'dd/MM/yyyy'),
                duration: course.duration,
                authors: course.authors.map((item) => {
                    return {
                        name: item['firstName'],
                        id: item['id'],
                        selected: true
                    }
                })
            })
        })
    }

    submit(e: any, createForm: FormGroup) {

        super.submit(e, createForm)

        let updatedItem: CourseItem = {
            id: this.course.id,
            name: createForm.controls.name.value,
            date: new Date(createForm.controls.date.value),
            duration: +createForm.controls.duration.value,
            description: createForm.controls.description.value,
            authors: createForm.controls.authors.value.filter((item: AuthorVM) => item.selected).map((item: AuthorVM) => {
                return <Author>{
                    id: item.id,
                    firstName: item.firstName,
                    lastName: item.lastName
                }
            })
        }

        this.courseSrv.updateItem(updatedItem).subscribe(() => {
            this.goToHomePage()
        })
    }


}
