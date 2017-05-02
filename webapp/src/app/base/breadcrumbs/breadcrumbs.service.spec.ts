import { TestBed, inject } from '@angular/core/testing'

import { Observable } from 'rxjs/Rx'

import { BreadcrumbsService } from './breadcrumbs.service'

describe('BreadcrumbsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BreadcrumbsService]
        })
    })

    it('should create', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
        expect(service).toBeTruthy()
    }))

    it('should return observable stream', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
        expect(service.getBreadCrumbStream() instanceof Observable).toBeTruthy()
    }))

    it('should return observable stream', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
        let value = 'Dude'
        service.getBreadCrumbStream().subscribe((val) => {
            expect(val).toBe(value)
        })
        service.setBreadCrumb(value)
    }))
})
