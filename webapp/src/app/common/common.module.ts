import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { XHRBackend, RequestOptions } from '@angular/http'

import { CoursesService } from './courses.service'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { DurationPipe } from './duration.pipe'
import { OrderByPipe } from './order-by.pipe'
import { AuthorizedHttpService } from './authorized-http.service'

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [DurationPipe],
    declarations: [DurationPipe, OrderByPipe],
    providers: [
        CoursesService,
        AuthService, AuthGuard,
        {
            provide: AuthorizedHttpService,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new AuthorizedHttpService(backend, options);
            },
            deps: [XHRBackend, RequestOptions]
        }
    ]
})
export class AppCommonModule { }
