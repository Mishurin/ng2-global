import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Rx'

import { CourseDetailsComponent } from './course-details.component'

import { DurationComponent } from '../common/components/details/duration.component'
import { DateComponent } from '../common/components/details/date.component'
import { AuthorsComponent } from '../common/components/details/authors.component'
import { DurationPipe } from '../common/pipes/duration.pipe'
import { CoursesService, AuthorizedHttpService, CourseItem } from '../common/index'

class MockRouter {
    navigate() { }
}

class MockCoursesService {
    getAuthors() {
        return Observable.of([])
    }
}

let courseFull = {
    name: 'Name',
    date: new Date(),
    description: 'Desc',
    authors: [{
        firstName: 'FNAme',
        lastName: 'LName',
        id: 1
    }],
    duration: 123
}

let authors = [{
    name: 'Name 1',
    id: 2,
    selected: false
}]

class MockActivatedRoute {
    get data() {
        return Observable.of([
            authors,
            courseFull
        ])
    }
}

describe('CourseDetailsComponent', () => {
    let component: CourseDetailsComponent
    let fixture: ComponentFixture<CourseDetailsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [CourseDetailsComponent, DurationComponent, DateComponent, AuthorsComponent, DurationPipe],
            providers: [
                { provide: CoursesService, useClass: MockCoursesService },
                { provide: Router, useClass: MockRouter },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseDetailsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
