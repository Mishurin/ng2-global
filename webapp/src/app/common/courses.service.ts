import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import { Course, CourseItem, CoursesListMock } from './index'

@Injectable()
export class CoursesService {

    courses: Course[] = [ ...CoursesListMock ]

    private coursesStream: Observable<Course[]> = Observable.of(this.courses)

    constructor() { }

    createCourse(course: Course) {
        // Finds max id. Should be generated on backend
        let id = Math.max.apply(Math, this.courses.map(course => course.id))
        course.id = id === null ? 0 : id + 1
        this.courses.push(course)
    }

    getCourseById(id: number): Course {
        return this.courses[this.getIndexById(id)]
    }

    getCoursesStream(): Observable<Course[]> {
        return this.coursesStream.map(courses => {
            return courses
        })
    }

    getIndexById(id: number): number {
        let courseIndex = null

        this.courses.forEach((course, index) => {
            if (course.id === id) {
                courseIndex = index
                return
            }
        })

        return courseIndex
    }

    getList(): Course[] {
        return this.courses
    }

    updateItem(id: number, newFields: CourseItem) {
        let course = this.courses[this.getIndexById(id)]
        course.name = newFields.name
        course.date = newFields.date
        course.duration = newFields.duration
        course.description = newFields.description
    }

    removeItem(id: number) {
        this.courses.splice(this.getIndexById(id), 1)
    }

}
