import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs/Rx'
import { Http, Response, RequestOptions, Headers, URLSearchParams, RequestMethod, Request } from '@angular/http'
import { Store } from '@ngrx/store'

import { Course, CourseItem, Author} from '../entities/index'
import { AuthorizedHttpService } from '../services/index'
import { getEntry, ENTRY_POINTS } from '../../app.config'
import { getIndexById } from '../../utils/collection.utils'
import { AppStore } from '../reducers/index'
import  *  as coursesActions from '../actions/index'

export interface Page<T> {
    items: T[]
    count: number,
    limit: number
}

@Injectable()
export class CoursesService {

    private coursesStream: ReplaySubject<Page<Course>> = new ReplaySubject<Page<Course>>()

    constructor(private aHttp: AuthorizedHttpService, private store: Store<AppStore>) {}

    createCourse(course: CourseItem): Observable<CourseItem> {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let reqOptions = new RequestOptions()
        reqOptions.body = course
        reqOptions.url = getEntry(ENTRY_POINTS.COURSES)
        reqOptions.headers = headers
        reqOptions.method = RequestMethod.Post

        let request = new Request(reqOptions)
        return this.aHttp.request(request).map((res: Response) => {
            let courseData = <CourseItem>res.json()
            this.store.dispatch(new coursesActions.AddCourseSuccessAction(courseData))
            return courseData
        }).catch(this.handleError)
    }

    getCoursesStream(): Observable<Page<Course>> {
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

            return <Page<Course>>{
                items: items,
                count: data.count,
                limit: data.limit
            }
        })
    }

    getCourse(id: number): Observable<CourseItem> {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let reqOptions = new RequestOptions()
        reqOptions.url =  `${getEntry(ENTRY_POINTS.COURSES)}/${id}`
        reqOptions.method =  RequestMethod.Get
        reqOptions.headers = headers
        let request = new Request(reqOptions)
        return this.aHttp.request(request)
            .map((response: Response) => {
                return response.json()
            }).catch(this.handleError)
    }

    getPage(page: number, query?: string): Observable<Page<CourseItem>> {
        let params: URLSearchParams = new URLSearchParams();
        const limit = 5
        params.set('_page', String(page));
        params.set('_limit', String(limit))
        if (query) params.set('q', query)
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let reqOptions = new RequestOptions()
        reqOptions.url =  getEntry(ENTRY_POINTS.COURSES)
        reqOptions.search = params
        reqOptions.method =  RequestMethod.Get
        reqOptions.headers = headers
        let request = new Request(reqOptions)
        return this.aHttp.request(request)
            .map((response: Response) => {
                let result = <Page<any>>{
                    items: response.json(),
                    count: Number(response.headers.get('x-total-count')),
                    limit: limit
                }
                this.coursesStream.next(result)
                this.store.dispatch(new coursesActions.LoadCoursesSuccessAction(result))
                return result;
            }).catch(this.handleError)
    }

    getAuthors(): Observable<Author[]> {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let reqOptions = new RequestOptions()
        reqOptions.url =  getEntry(ENTRY_POINTS.AUTHORS)
        reqOptions.method =  RequestMethod.Get
        reqOptions.headers = headers
        let request = new Request(reqOptions)
        return this.aHttp.request(request)
            .map((response: Response) => {
               return response.json()
            }).catch(this.handleError)
    }

    handleError(err: any) {
        console.log('sever error:', err);
        if (err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    updateItem(course: CourseItem): Observable<CourseItem> {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let reqOptions = new RequestOptions()
        reqOptions.body = course
        reqOptions.url = `${getEntry(ENTRY_POINTS.COURSES)}/${course.id}`
        reqOptions.headers = headers
        reqOptions.method = RequestMethod.Put

        let request = new Request(reqOptions)
        
        return this.aHttp.request(request).map((res: Response) => {
            let courseData = <CourseItem>res.json()
            this.store.dispatch(new coursesActions.UpdateCourseActionSuccess(courseData))
            return courseData
        }).catch(this.handleError)
    }

    removeItem(id: number) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let reqOptions = new RequestOptions()
        reqOptions.url = `${getEntry(ENTRY_POINTS.COURSES)}/${id}`
        reqOptions.method = RequestMethod.Delete
        reqOptions.headers = headers
        let request = new Request(reqOptions)
        
        return this.aHttp.request(request).map((response: Response) => {
            this.store.dispatch(new coursesActions.RemoveCourseSuccessAction(id))
        }).catch(this.handleError)

    }

}
