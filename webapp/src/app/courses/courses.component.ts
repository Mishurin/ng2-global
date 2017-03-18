import { Component, OnInit } from '@angular/core'

import { CourseItem, CoursesListMock, CoureItemMock, CoursesService } from '../common/index'

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

    private courses: CourseItem[]

    constructor(private coursesSrv: CoursesService) { }

    ngOnInit() {
        this.courses = this.coursesSrv.getList()
    }

    onDeleteCourse(course: CourseItem) {
        let index = this.courses.indexOf(CoureItemMock)
        console.log(course.id)
        this.courses.splice(index, 1)
    }

}
