import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

import { CourseItem, CoureItemMock, CoursesService, OrderByPipe } from '../common/index'

import { LoaderService } from '../base/index'

interface Window {
    confirm(message: string): boolean
}

declare var window: Window;

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {

    private _courses: CourseItem[]
    public courses: CourseItem[]

    constructor(private coursesSrv: CoursesService, private loader: LoaderService) { }

    ngOnInit() {
        this._courses = new OrderByPipe().transform(this.coursesSrv.getList(), 'name')
        this.courses = this._courses
    }

    confirmWrapper(message: string) {
        return window.confirm(message)
    }

    onDeleteCourse(course: CourseItem) {
        if (this.confirmWrapper("Are you sure?")) {
            this.loader.show()
            setTimeout(() => {
                this.coursesSrv.removeItem(course.id)
                this.loader.hide()
            }, 1000)
        }
    }

    onFindCourses(searchVal: string) {
        this.courses = CoursesComponent.filterCourses(this._courses, searchVal)
    }

    static filterCourses(courses: CourseItem[], searchVal: string): CourseItem[] {
        return courses.filter((course: CourseItem) => {
            return course.name.toLowerCase().includes(searchVal.toLowerCase()) || !!!searchVal
        })
    }

}
