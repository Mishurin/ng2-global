import { TestBed, inject } from '@angular/core/testing'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'


import { AuthorsResolverService } from './authors-resolver.service'
import { CoursesService } from '../../index'

class MockRouter {
    navigate() { }
}

class MockCoursesService {
    getAuthors() {
        return Observable.of([])
    }
}

describe('AuthorsResolverService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthorsResolverService,
                { provide: CoursesService, useClass: MockCoursesService },
                { provide: Router, useClass: MockRouter }
            ]
        })
    })

    it('should ...', inject([AuthorsResolverService], (service: AuthorsResolverService) => {
        expect(service).toBeTruthy()
    }))
})
