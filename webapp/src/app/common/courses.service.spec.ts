import { TestBed, inject } from '@angular/core/testing'
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, Headers } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'
import { Observable } from 'rxjs/Rx'

import { CoursesService } from './courses.service'

import { Course, CourseItem, CoursesListMock } from './index'


describe('CoursesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                CoursesService,
                {
                    provide: Http, useFactory: (backend, options) => {
                        return new Http(backend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
            ]
        })
    })

    it('should be initialized', inject([CoursesService], (service: CoursesService) => {
        expect(service).toBeTruthy()
    }))

    it('shoud respond with new item', inject([MockBackend, CoursesService], (backend: MockBackend, service: CoursesService) => {
        let id = 9999
        let name = 'video'
        let date = new Date()
        let duration = 30
        let description = 'Description...'
        let isTopRated = false
        let course = new Course(null, name, date, duration, description, isTopRated)

        let getPage = spyOn(service, 'getPage').and.callFake(() => Observable.of([]))

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions();
                opts.body = new Course(id, name, date, duration, description, isTopRated)
                connection.mockRespond(new Response(opts));
            }
        })

        service.createCourse(course).subscribe(response => {
            expect(response).toEqual(new Course(id, name, date, duration, description, isTopRated))
            expect(getPage).toHaveBeenCalled()
        })

    }))


    it('should return observable stream', inject([CoursesService], (service: CoursesService) => {
        let course = new Course(9999, 'video', new Date(), 10, "Description...", true)
        let coursesStream = service.getCoursesStream()
        expect(coursesStream instanceof Observable).toBeTruthy()

        coursesStream.subscribe((e) => {
            expect(e).toEqual([course])
        })

    }))

    it('should return list of courses per page', inject([MockBackend, CoursesService], (backend: MockBackend, service: CoursesService) => {
        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions({ body: CoursesListMock });
                let headers = new Headers()
                headers.append('x-total-count', '10')
                opts.headers = headers
                connection.mockRespond(new Response(opts));
            }
        })

        service.getPage(0).subscribe(response => {
            expect(response).toEqual({
                items: CoursesListMock,
                count: 10,
                limit: 5
            })
        })
    }))

    it('should remove item', inject([MockBackend, CoursesService], (backend: MockBackend, service: CoursesService) => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...", true)

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions();
                connection.mockRespond(new Response(opts));
            }
        })

        let requestFinished = false

        service.removeItem(courseId).subscribe(() => {
            requestFinished = true
            expect(requestFinished).toBeTruthy()
        })

    }))

})
