import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { Observable, Subscription } from 'rxjs/Rx'

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
export class CoursesComponent implements OnInit, OnDestroy {

    private _courses: CourseItem[]
    public courses: CourseItem[]
    public coursesSubscription: Subscription

    constructor(private coursesSrv: CoursesService, private loader: LoaderService) { }

    ngOnInit() {
        this.coursesSubscription = this.coursesSrv.getCoursesStream().subscribe(courses => {
            this._courses = new OrderByPipe().transform(courses, 'name')
            this.courses = this._courses
        })
    }

    ngOnDestroy() {
        this.coursesSubscription.unsubscribe()
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
