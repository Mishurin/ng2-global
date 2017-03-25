import { TestBed, inject } from '@angular/core/testing'

import { LoaderService } from './loader.service'
import { Observable } from 'rxjs/Rx'


describe('LoaderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoaderService]
        })
    })

    it('should be initialized', inject([LoaderService], (service: LoaderService) => {
        expect(service).toBeTruthy()
    }))

    it('should return observable stream', inject([LoaderService], (service: LoaderService) => {
        expect(service.getHideLoaderStream() instanceof Observable).toBeTruthy()
    }))

    it('should emit true for hide stream', inject([LoaderService], (service: LoaderService) => {
        service.getHideLoaderStream().subscribe((isHidden) => {
            expect(isHidden).toBeTruthy()
        })
        service.hide();
        expect(service.isHidden()).toBeTruthy()
    }))

    it('should emit false for hide stream', inject([LoaderService], (service: LoaderService) => {
        service.getHideLoaderStream().subscribe((isHidden) => {
            expect(isHidden).toBeFalsy()
        })
        service.show();
        expect(service.isHidden()).toBeFalsy()
    }))

})
