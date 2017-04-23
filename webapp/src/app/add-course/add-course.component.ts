import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { CoursesService, CourseItem } from '../common/index'

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    constructor(private courseSrv: CoursesService, private router: Router) { }

    ngOnInit() {
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

}
