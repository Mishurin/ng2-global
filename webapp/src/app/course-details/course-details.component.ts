import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder } from '@angular/forms'

import { CoursesService, CourseItem, DetailsComponent, Author } from '../common/index'

@Component({
    selector: 'course-details',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class CourseDetailsComponent extends DetailsComponent {

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

            this.createForm.setValue({
                name: course.name,
                description: course.description,
                date: new Date(course.date),
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


}
