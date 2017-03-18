import { Injectable } from '@angular/core'

import { Course, CourseItem } from './index'

@Injectable()
export class CoursesService {

    public courses: Course[] = []

    constructor() { }

    createCourse(course: Course) {
        // Finds max id. Should be generated on backend
        let id = Math.max.apply(Math, this.courses.map(course => course.id))
        course.id = id === null? 0 : id + 1
        this.courses.push(course)
    }

    getCourseById(id: number): Course {
        return this.courses.find(course => course.id == id)
    }

    getList(): Course[] {
        return this.courses
    }

    updateItem(id: number, newFields: CourseItem) {
        let course = this.courses.find(course => course.id == id)
        course.type = newFields.type
        course.date = newFields.date
        course.duration = newFields.duration
        course.description = newFields.description
    }

    removeIem(id: number) {
        let index = this.courses.indexOf(this.courses.find(course => course.id == id))
        delete this.courses[index]
    }

}
