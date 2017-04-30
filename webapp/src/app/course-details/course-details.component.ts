import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { AddCourseComponent } from '../add-course/add-course.component'

import { CoursesService, CourseItem } from '../common/index'

@Component({
    selector: 'course-details',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class CourseDetailsComponent extends AddCourseComponent {

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
            let course = <CourseItem>data[0]
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
