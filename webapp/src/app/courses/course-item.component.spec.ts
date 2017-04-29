import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { CourseItemComponent } from './course-item.component'
import { ToolboxComponent } from './toolbox.component'

import { CoureItemMock, DurationPipe } from '../common/index'

class MockRouter {

}

describe('CourseItemComponent', () => {
    let component: CourseItemComponent
    let fixture: ComponentFixture<CourseItemComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CourseItemComponent, ToolboxComponent, DurationPipe],
            providers: [{ provide: Router, useClass: MockRouter }]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseItemComponent)
        component = fixture.componentInstance
        component.course = CoureItemMock
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should emit delete event', (done) => {

        component.deleteCourse.subscribe((event) => {
            expect(event).toBe(component.course)
            done()
        })

        component.delete()

    })

})
