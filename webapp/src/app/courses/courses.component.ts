import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Observable, Subscription } from 'rxjs/Rx'
import { Store } from '@ngrx/store'

import { CourseItem, CoureItemMock, CoursesService, OrderByPipe, Page, AppStore } from '../common/index'

import { LoaderService } from '../base/index'

import { getTimeSpanInDays } from '../utils/date.utils'
import { getIndexById } from '../utils/collection.utils'

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
    storeSubscription: Subscription
    page: Page<CourseItem> = null
    searchVal: string = null

    constructor(
        private coursesSrv: CoursesService, 
        private loader: LoaderService, 
        private cd: ChangeDetectorRef,
        private store: Store<AppStore>
        ) { }

    ngOnInit() {

        this.coursesSubscription = this.coursesSrv.getPage(0).subscribe()

        this.storeSubscription = this.store.select<Page<CourseItem>>('page').subscribe((page) => {
            this._courses = new OrderByPipe().transform(page.items, 'name')
            this.courses = this._courses
            this.page = page
            this.cd.markForCheck()
        })
    }

    ngOnDestroy() {
        this.coursesSubscription.unsubscribe()
        this.storeSubscription.unsubscribe()
    }

    isPagesBlockShouldBeShown() {
        return !!this.page
    }

    getPageNumbers(): number[] {
        let numberOfPages = Math.ceil(this.page.count / this.page.limit)
        let result = []
        for(var i = 0; i < numberOfPages; i++) {
            result.push(i + 1)
        }
        return result
    }

    getPage(page: number, query: string) {
        this.coursesSubscription = this.coursesSrv.getPage(page, query).subscribe()
    }

    confirmWrapper(message: string) {
        return window.confirm(message)
    }

    onDeleteCourse(course: CourseItem) {
        if (this.confirmWrapper("Are you sure?")) {
            this.loader.show()
            this.coursesSrv.removeItem(course.id).subscribe((data) => {
                this.courses.splice(getIndexById(course.id, this.courses), 1)
                this.loader.hide()
                this.cd.markForCheck()
            })
        }
    }

    onFindCourses(searchVal: string) {
        this.searchVal = searchVal
        this.coursesSubscription = this.coursesSrv.getPage(0, searchVal).subscribe()
    }

}
