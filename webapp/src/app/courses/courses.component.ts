import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Observable, Subscription } from 'rxjs/Rx'

import { CourseItem, CoureItemMock, CoursesService, OrderByPipe, Pages } from '../common/index'

import { LoaderService } from '../base/index'

import { getTimeSpanInDays } from '../utils/date.utils'

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

    private _courses: CourseItem[] = []
    courses: CourseItem[] = []
    coursesSubscription: Subscription
    pages: Pages<CourseItem> = null

    constructor(private coursesSrv: CoursesService, private loader: LoaderService, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.coursesSubscription = this.coursesSrv.getCoursesStream().subscribe(pages => {
            this._courses = new OrderByPipe().transform(CoursesComponent.filterOutOld(pages.items), 'name')
            this.courses = this._courses
            this.pages = pages
            this.cd.markForCheck()
        })
    }

    ngOnDestroy() {
        this.coursesSubscription.unsubscribe()
    }

    isPagesBlockShouldBeShown() {
        return !!this.pages
    }

    getPageNumbers(): number[] {
        let numberOfPages = Math.ceil(this.pages.count / this.pages.limit)
        let result = []
        for(var i = 0; i < numberOfPages; i++) {
            result.push(i + 1)
        }
        return result
    }

    getPage(page: number) {
        this.coursesSrv.getPage(page)
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

    static filterOutOld(course: CourseItem[]): CourseItem[] {
        return course.filter(item => {
            return !(getTimeSpanInDays(new Date(), item.date) > 14)
        })
    }

}
