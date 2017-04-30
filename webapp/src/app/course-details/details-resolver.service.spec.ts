import { TestBed, inject } from '@angular/core/testing'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'


import { DetailsResolverService } from './details-resolver.service'
import { CoursesService } from '../common/index'

class MockRouter {
    navigate() { }
}

class MockCoursesService {
    getAuthors() {
        return Observable.of([])
    }
}

describe('DetailsResolverService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DetailsResolverService,
                { provide: CoursesService, useClass: MockCoursesService },
                { provide: Router, useClass: MockRouter }]
        })
    })

    it('should ...', inject([DetailsResolverService], (service: DetailsResolverService) => {
        expect(service).toBeTruthy()
    }))
})
