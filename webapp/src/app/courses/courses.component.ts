import { Component, OnInit } from '@angular/core'

import { CourseItem, CoureItemMock, CoursesService } from '../common/index'

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

    public courses: CourseItem[]

    constructor(private coursesSrv: CoursesService) { }

    ngOnInit() {
        this.courses = this.coursesSrv.getList()
    }

    onDeleteCourse(course: CourseItem) {
        this.coursesSrv.removeItem(course.id)
    }

}
