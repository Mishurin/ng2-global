import { TestBed, inject } from '@angular/core/testing'
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http'

import { AuthorizedHttpService } from './authorized-http.service'

describe('AuthorizedHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {
                    provide: AuthorizedHttpService,
                    useFactory: (backend: XHRBackend, options: RequestOptions) => {
                        return new AuthorizedHttpService(backend, options);
                    },
                    deps: [XHRBackend, RequestOptions]
                }
            ]
        })
    })

    it('should ...', inject([AuthorizedHttpService], (service: AuthorizedHttpService) => {
        expect(service).toBeTruthy()
    }))
})
