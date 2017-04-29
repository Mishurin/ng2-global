import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { DetailsComponent } from './details.component'
import { DurationComponent } from './duration.component'
import { DateComponent } from './date.component'
import { AuthorsComponent } from './authors.component'
import { DurationPipe, CoursesService, Course } from '../../index'
import { Observable } from 'rxjs/Rx'

class MockRouter {
    navigate() { }
}

class MockCoursesService {
    createCourse(course: Course) { }
    getAuthors() {
        return Observable.of([])
    }
}

@Component({
    selector: 'course-duration',
})
class MockDurationComponent { }

@Component({
    selector: 'course-date',
})
class MockDateComponent { }

@Component({
    selector: 'course-authors',
})
class MockAuthorsComponent { }

describe('DetailsComponent', () => {
    let component: DetailsComponent
    let fixture: ComponentFixture<DetailsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [
                DurationComponent,
                DetailsComponent,
                DurationPipe,
                DateComponent,
                AuthorsComponent
            ],
            providers: [
                { provide: CoursesService, useClass: MockCoursesService },
                { provide: Router, useClass: MockRouter },
                FormBuilder
            ]
        })
            .overrideComponent(DurationComponent, MockDurationComponent)
            .overrideComponent(DateComponent, MockDateComponent)
            .overrideComponent(AuthorsComponent, MockAuthorsComponent)
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
