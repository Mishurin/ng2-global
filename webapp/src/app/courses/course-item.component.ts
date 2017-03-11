import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

    @Input() private course;

    @Output() private deleteCourse = new EventEmitter(true);


    constructor() { }

    ngOnInit() {
    }

    delete() {
        this.deleteCourse.emit(this.course);
    }

}
