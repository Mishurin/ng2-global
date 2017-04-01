import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core'

import { CourseItem } from '../common/index'

@Component({
    selector: 'app-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {

    @Input() course: CourseItem

    @Output() deleteCourse = new EventEmitter(true)


    constructor() { }

    ngOnInit() {
    }

    delete() {
        this.deleteCourse.emit(this.course)
    }

}
