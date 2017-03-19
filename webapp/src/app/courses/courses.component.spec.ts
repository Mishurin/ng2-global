import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Component, Input } from '@angular/core'

import { CoursesComponent } from './courses.component'
import { ToolboxComponent } from './toolbox.component'
import { CourseItemComponent } from './course-item.component'


import { Course, CoursesService } from '../common/index'

class MockCoursesService {
    getList(): Course[] {
        return []
    }
    removeItem(id: number) { }
}

@Component({
    selector: 'app-course-item'
})
class MockCourseItemComponent {
    @Input() course: Course
}

@Component({
    selector: 'app-toolbox'
})
class MockToolboxComponent { }

describe('CoursesComponent', () => {
    let component: CoursesComponent
    let fixture: ComponentFixture<CoursesComponent>
    let coursesSrv: CoursesService
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CoursesComponent, CourseItemComponent, ToolboxComponent],
            providers: [{ provide: CoursesService, useClass: MockCoursesService }]
        })
            .overrideComponent(CourseItemComponent, MockCourseItemComponent)
            .overrideComponent(ToolboxComponent, MockToolboxComponent)
            .compileComponents()

    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesComponent)
        component = fixture.componentInstance
        coursesSrv = TestBed.get(CoursesService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get list of courses on init', () => {
        let getList = spyOn(coursesSrv, 'getList')
        component.ngOnInit()

        expect(getList).toHaveBeenCalled()
    })

    it('should be initialized with list of courses', () => {
        expect(component.courses).toBeTruthy()
    })

    it('should call delete method of service', () => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...")
        let removeItem  = spyOn(coursesSrv, 'removeItem')
        component.courses.push(course)
        component.onDeleteCourse(course)
        
        expect(removeItem).toHaveBeenCalledWith(courseId)
        
    })

})
