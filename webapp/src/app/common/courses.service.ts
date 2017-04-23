import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs/Rx'
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'

import { Course, CourseItem } from './index'
import { getEntry, ENTRY_POINTS } from '../app.config'

import { getIndexById } from '../utils/collection.utils'

export interface Pages<T> {
    items: T[]
    count: number,
    limit: number
}

@Injectable()
export class CoursesService {

    private coursesStream: ReplaySubject<Pages<Course>> = new ReplaySubject<Pages<Course>>()

    constructor(private http: Http) { }

    createCourse(course: CourseItem): Observable<any> {
        let body = course
        let opts = new RequestOptions()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        opts.headers = headers
        return this.http.post(getEntry(ENTRY_POINTS.COURSES), body, opts).map((res: Response) => {
            this.getPage(0).subscribe()
            return <Course>res.json()
        }).catch(this.handleError)
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

    getPage(page: number, query?: string): Observable<Pages<any>> {
        let params: URLSearchParams = new URLSearchParams();
        const limit = 5
        params.set('_page', String(page));
        params.set('_limit', String(limit))
        if (query) params.set('q', query)
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
        // TODO: make it in line with other backend functionallity
        // let course = this.courses[getIndexById(id, this.courses)]
        // course.name = newFields.name
        // course.date = newFields.date
        // course.duration = newFields.duration
        // course.description = newFields.description
    }

    removeItem(id: number) {
        let opts = new RequestOptions()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        opts.headers = headers
        return this.http.delete(`${getEntry(ENTRY_POINTS.COURSES)}/${id}`, opts).catch(this.handleError)
        // TODO: sync with the main pipe
        //this.coursesStream.next(this.courses)
    }

}
