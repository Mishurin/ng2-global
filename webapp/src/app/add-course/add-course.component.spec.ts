import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'

import { AddCourseComponent } from './add-course.component'

import { DurationComponent } from '../common/components/details/duration.component'
import { DateComponent } from '../common/components/details/date.component'
import { AuthorsComponent } from '../common/components/details/authors.component'
import { DurationPipe } from '../common/pipes/duration.pipe'
import { CoursesService, AuthorizedHttpService } from '../common/services/index'

class MockRouter {
    navigate() { }
}

class MockCoursesService {
    getAuthors() {
        return Observable.of([])
    }
}


describe('AddCourseComponent', () => {
    let component: AddCourseComponent
    let fixture: ComponentFixture<AddCourseComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [
                DurationComponent,
                AddCourseComponent,
                DurationPipe,
                DateComponent,
                AuthorsComponent
            ],
            providers: [
                { provide: CoursesService, useClass: MockCoursesService },
                { provide: Router, useClass: MockRouter }
            ]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCourseComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
