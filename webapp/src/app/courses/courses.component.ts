import { Component, OnInit } from '@angular/core';

import { CourseItem } from '../common/entities/course-item.int';
import { CoursesListMock } from '../common/entities/course-list.mock';
import { CoureItemMock }  from '../common/entities/course-item.mock';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

    private courses: CourseItem[];

    constructor() { }

    ngOnInit() {
        this.courses = CoursesListMock;
    }

    onDeleteCourse(course: CourseItem) {
        let index = this.courses.indexOf(CoureItemMock);
        console.log(course.id);
        this.courses.splice(index, 1);

    }

}
