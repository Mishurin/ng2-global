import { Component, OnInit } from '@angular/core';

import { CourseItem } from '../common/entities/course-item.int';
import { COURSES } from '../common/entities/course-list';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

    private courses: CourseItem[];

    constructor() { }

    ngOnInit() {
        this.courses = COURSES;
    }

}
