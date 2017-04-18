import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs/Rx'
import { Http, Response, RequestOptions, Headers } from '@angular/http'

import { Course, CourseItem, CoursesListMock } from './index'
import { getEntry, ENTRY_POINTS } from '../app.config'

@Injectable()
export class CoursesService {


    courses: Course[] = [...CoursesListMock]

    private coursesStream: ReplaySubject<Course[]> = new ReplaySubject<Course[]>()

    constructor(private http: Http) { }

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
        this.getList().subscribe()
        return this.coursesStream.asObservable().map(courses => {
            return courses.map((course => {
                return new Course(course.id,
                    course.name,
                    new Date(course.date),
                    course.duration,
                    course.description,
                    course.isTopRated)
            }));
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

    getList(): Observable<any[]> {
        let opts = new RequestOptions()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        opts.headers = headers
        return this.http.get(getEntry(ENTRY_POINTS.COURSES), opts)
            .map((response: Response) => {
                let data = <any[]>response.json()
                this.coursesStream.next(data)
                return data
            }).catch(this.handleError)
    }


    handleError(err: any) {
        console.log('sever error:', err);
        if (err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
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
        this.coursesStream.next(this.courses)
    }

}
