import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { CourseItem } from '../common/entities/course-item.int';

@Component({
    selector: 'app-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

    @Input() course: CourseItem;

    @Output() deleteCourse = new EventEmitter(true);


    constructor() { }

    ngOnInit() {
    }

    delete() {
        this.deleteCourse.emit(this.course);
    }

}