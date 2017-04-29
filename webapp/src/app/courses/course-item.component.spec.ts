import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { CourseItemComponent } from './course-item.component'
import { ToolboxComponent } from './toolbox.component'

import { CoureItemMock, DurationPipe } from '../common/index'
import { ROUTES } from '../app.config'

class MockRouter {
    navigate() {}
}

describe('CourseItemComponent', () => {
    let component: CourseItemComponent
    let fixture: ComponentFixture<CourseItemComponent>
    let router: Router

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
        router = TestBed.get(Router)
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

    it('should go to the details page', () => {
        let courseId = 9999
        let navigate = spyOn(router, 'navigate')
        component.goToDetails(courseId)
        expect(navigate).toHaveBeenCalledWith([ROUTES.COURSES, courseId])
    })

})
