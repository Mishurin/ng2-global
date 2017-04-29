import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { XHRBackend, RequestOptions } from '@angular/http'

import { CoursesService } from './services/courses.service'
import { AuthService } from './services/auth.service'
import { AuthGuard } from './guards/auth.guard'
import { DurationPipe } from './pipes/duration.pipe'
import { OrderByPipe } from './pipes/order-by.pipe'
import { AuthorizedHttpService } from './services/authorized-http.service'

import { DurationComponent } from './components/details/duration.component'
import { DateComponent } from './components/details/date.component'
import { AuthorsComponent } from './components/details/authors.component'


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [DurationPipe, DurationComponent, DateComponent, AuthorsComponent],
    declarations: [
        DurationPipe,
        OrderByPipe,
        DurationComponent,
        DateComponent,
        AuthorsComponent
    ],
    providers: [
        CoursesService,
        AuthService,
        AuthGuard,
        AuthorizedHttpService
    ]
})
export class AppCommonModule { }
