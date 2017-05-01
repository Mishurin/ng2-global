import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { DetailsComponent } from './details.component'
import { DurationComponent } from './duration.component'
import { DateComponent } from './date.component'
import { AuthorsComponent } from './authors.component'
import { DurationPipe, CoursesService, Course, Author, AuthorVM } from '../../index'
import { Observable } from 'rxjs/Rx'

import { ROUTES } from '../../../app.config'

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
    let router: Router

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
        router = TestBed.get(Router)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should go to home page', () => {
        let navigate = spyOn(router, 'navigate')
        component.goToHomePage()
        expect(navigate).toHaveBeenCalledWith([ROUTES.HOME])
    })

    it('should return list of authors from vms list', () => {
        let authorsVMs: AuthorVM[] = [
            { firstName: 'Dude', lastName: 'Dude', id: 1, selected: true },
            { firstName: 'Another', lastName: 'Guy', id: 2, selected: false }
        ]
        let authors: Author[] = [
            { firstName: 'Dude', lastName: 'Dude', id: 1 }
        ]
        expect(DetailsComponent.getAuthorsFromVms(authorsVMs)).toEqual(authors)
    })
})
