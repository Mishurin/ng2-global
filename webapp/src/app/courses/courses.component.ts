import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

import { CourseItem, CoureItemMock, CoursesService } from '../common/index'

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

    public courses: CourseItem[]

    constructor(private coursesSrv: CoursesService, private loader: LoaderService) { }

    ngOnInit() {
        this.courses = this.coursesSrv.getList()
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

}
