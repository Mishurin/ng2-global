import { Component, OnInit } from '@angular/core'

import { CourseItem, CoureItemMock, CoursesService } from '../common/index'

interface Window {
    confirm(message: string): boolean
}

declare var window: Window;

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

    confirmWrapper(message: string) {
        return window.confirm(message)
    }

    onDeleteCourse(course: CourseItem) {
        if (this.confirmWrapper("Are you sure?")) this.coursesSrv.removeItem(course.id)
    }

}
