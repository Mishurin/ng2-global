import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AddCourseComponent } from './add-course.component'
import { DurationComponent } from './duration.component'
import { DateComponent } from './date.component'
import { DurationPipe } from '../common/duration.pipe'

@Component({
    selector: 'course-duration',
})
class MockDurationComponent { }

@Component({
    selector: 'course-date',
})
class MockDateComponent { }

describe('AddCourseComponent', () => {
    let component: AddCourseComponent
    let fixture: ComponentFixture<AddCourseComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DurationComponent, AddCourseComponent, DurationPipe, DateComponent]
        })
            .overrideComponent(DurationComponent, MockDurationComponent)
            .overrideComponent(DateComponent, MockDateComponent)
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
