import { TestBed, inject } from '@angular/core/testing'
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, Headers } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'
import { Observable } from 'rxjs/Rx'
import { Store } from '@ngrx/store'

import { Course, CourseItem, CoursesListMock, Author } from '../entities/index'
import { AuthorizedHttpService, CoursesService } from '../services/index'
import * as actions from '../actions/courses.actions'
import { AppStore } from '../index'

class MockStore {
    dispatch() {}
}

const COURSE_ITEMS_MOCK: CourseItem[] = [
    {
        id: 1,
        name: 'name1',
        date: new Date(),
        duration: 100,
        description: 'description1',
        authors: [
            {
                id: 1,
                firstName: 'fname1',
                lastName: 'lname1'
            }
        ],
        isTopRated: false
    },
    {
        id: 2,
        name: 'name2',
        date: new Date(),
        duration: 200,
        description: 'description2',
        authors: [
            {
                id: 2,
                firstName: 'fname2',
                lastName: 'lname2'
            }
        ],
        isTopRated: false
    }
]

describe('CoursesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                CoursesService,
                {
                    provide: AuthorizedHttpService, useFactory: (backend, options) => {
                        return new AuthorizedHttpService(backend, options)
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: Store, useClass: MockStore
                },
                MockBackend,
                BaseRequestOptions,
            ]
        })
    })

    it('should be initialized', inject([CoursesService], (service: CoursesService) => {
        expect(service).toBeTruthy()
    }))

    it('shoud respond with new item', inject([MockBackend, CoursesService, Store], (backend: MockBackend, service: CoursesService, store: Store<AppStore>) => {
        let dispatch = spyOn(store, 'dispatch')

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions()
                opts.body = COURSE_ITEMS_MOCK[0]
                connection.mockRespond(new Response(opts))
            }
        })

        service.createCourse(COURSE_ITEMS_MOCK[0]).subscribe(response => {
            expect(response).toEqual(COURSE_ITEMS_MOCK[0])
            expect(dispatch).toHaveBeenCalledWith(new actions.AddCourseSuccessAction(COURSE_ITEMS_MOCK[0]))
        })

    }))

    it('shoud respond with collection of authors', inject([MockBackend, CoursesService], (backend: MockBackend, service: CoursesService) => {

        const AUTHORS_MOCK: Author[] = [
            {
                id: 1,
                firstName: 'fname1',
                lastName: 'lname1'
            },
            {
                id: 2,
                firstName: 'fname2',
                lastName: 'lname2'
            }
        ]

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions()
                opts.body = AUTHORS_MOCK
                connection.mockRespond(new Response(opts))
            }
        })

        service.getAuthors().subscribe(response => {
            expect(response).toEqual(AUTHORS_MOCK)
        })

    }))

    it('shoud respond with standalone course item', inject([MockBackend, CoursesService], (backend: MockBackend, service: CoursesService) => {

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions()
                opts.body = COURSE_ITEMS_MOCK[0]
                connection.mockRespond(new Response(opts))
            }
        })

        service.getCourse(1).subscribe(response => {
            expect(response).toEqual(COURSE_ITEMS_MOCK[0])
        })

    }))

    it('should return observable stream', inject([MockBackend, CoursesService], (backend: MockBackend, service: CoursesService) => {
        // Since coursesStream is private there is no direct way to emit event for it. That is 
        // why getPage used.
        let getPage = spyOn(service, 'getPage').and.callThrough()
        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions({ body: CoursesListMock })
                let headers = new Headers()
                headers.append('x-total-count', '10')
                opts.headers = headers
                connection.mockRespond(new Response(opts))
            }
        })

        let coursesStream = service.getCoursesStream()

        expect(coursesStream instanceof Observable).toBeTruthy()
        expect(getPage).toHaveBeenCalledWith(0)
        
        coursesStream.subscribe((payload) => {
            expect(payload).toEqual({
                items: CoursesListMock,
                count: 10,
                limit: 5
            })
        })

    }))

    it('should return list of courses per page', inject([MockBackend, CoursesService, Store], (backend: MockBackend, service: CoursesService, store: Store<AppStore>) => {
        let dispatch = spyOn(store, 'dispatch')
        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions({ body: CoursesListMock })
                let headers = new Headers()
                headers.append('x-total-count', '10')
                opts.headers = headers
                connection.mockRespond(new Response(opts))
            }
        })

        service.getPage(0).subscribe(response => {
            let expectedResult = {
                items: CoursesListMock,
                count: 10,
                limit: 5
            }
            
            expect(response).toEqual(expectedResult)
            expect(dispatch).toHaveBeenCalledWith(new actions.LoadCoursesSuccessAction(expectedResult))
        })
    }))

    it('shoud respond with updated item', inject([MockBackend, CoursesService, Store], (backend: MockBackend, service: CoursesService, store: Store<AppStore>) => {
        
        let dispatch = spyOn(store, 'dispatch')

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions()
                opts.body = COURSE_ITEMS_MOCK[0]
                connection.mockRespond(new Response(opts))
            }
        })

        service.updateItem(COURSE_ITEMS_MOCK[0]).subscribe(response => {
            expect(response).toEqual(COURSE_ITEMS_MOCK[0])
            expect(dispatch).toHaveBeenCalledWith(new actions.UpdateCourseActionSuccess(COURSE_ITEMS_MOCK[0]))
        })

    }))

    it('should remove item', inject([MockBackend, CoursesService, Store], (backend: MockBackend, service: CoursesService, store: Store<AppStore>) => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...", true)
        let dispatch = spyOn(store, 'dispatch')

        backend.connections.subscribe((connection: MockConnection) => {
            {
                let opts = new ResponseOptions()
                connection.mockRespond(new Response(opts))
            }
        })

        let requestFinished = false

        service.removeItem(courseId).subscribe(() => {
            requestFinished = true
            expect(requestFinished).toBeTruthy()
            expect(dispatch).toHaveBeenCalledWith(new actions.RemoveCourseSuccessAction(courseId))
        })

    }))

})
