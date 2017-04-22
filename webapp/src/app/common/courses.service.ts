import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs/Rx'
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'

import { Course, CourseItem, CoursesListMock } from './index'
import { getEntry, ENTRY_POINTS } from '../app.config'

export interface Pages<T> {
    items: T[]
    count: number,
    limit: number
}

@Injectable()
export class CoursesService {


    courses: Course[] = [...CoursesListMock]

    private coursesStream: ReplaySubject<Pages<Course>> = new ReplaySubject<Pages<Course>>()

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

    getCoursesStream(): Observable<Pages<Course>> {
        this.getPage(0).subscribe()
        return this.coursesStream.asObservable().map(data => {
            let items: Course[] = data.items.map((course => {
                return new Course(course.id,
                    course.name,
                    new Date(course.date),
                    course.duration,
                    course.description,
                    course.isTopRated)
            }))
            
            return <Pages<Course>>{
                items: items,
                count: data.count,
                limit: data.limit
            }
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

    getPage(page: number): Observable<Pages<any>> {
        let params: URLSearchParams = new URLSearchParams();
        const limit = 5
        params.set('_page', String(page));
        params.set('_limit', String(limit))
        let opts = new RequestOptions()
        opts.search = params
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        opts.headers = headers
        return this.http.get(getEntry(ENTRY_POINTS.COURSES), opts)
            .map((response: Response) => {
                let result = <Pages<any>>{
                    items: response.json(),
                    count: Number(response.headers.get('x-total-count')),
                    limit: limit
                }
                this.coursesStream.next(result)
                return result;
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
        // TODO: sync with the main pipe
        //this.coursesStream.next(this.courses)
    }

}
