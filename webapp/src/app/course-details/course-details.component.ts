import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { AddCourseComponent } from '../add-course/add-course.component'

import { CoursesService } from '../common/index'

@Component({
    selector: 'course-details',
    templateUrl: '../common/components/details/details.component.html',
    styleUrls: ['../common/components/details/details.component.css']
})
export class CourseDetailsComponent extends AddCourseComponent {

    constructor(
        protected courseSrv: CoursesService,
        protected router: Router,
        protected fb: FormBuilder
    ) {
        super(courseSrv, router, fb)
    }


}
