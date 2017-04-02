import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Component, Input } from '@angular/core'

import { CoursesComponent } from './courses.component'
import { ToolboxComponent } from './toolbox.component'
import { CourseItemComponent } from './course-item.component'

import { CreateDateHighlighterDirective } from './create-date-highlighter.directive'


import { Course, CoursesService, DurationPipe, OrderByPipe } from '../common/index'
import { LoaderService, ProfilerComponent, BaseModule } from '../base/index'

class MockCoursesService {
    getList(): Course[] {
        return []
    }
    removeItem(id: number) { }
    confirmWrapper(message: string) { }
}

class MockLoaderService {
    show() { }
    hide() { }
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

@Component({
    selector: 'app-profiler'
})
class MockProfilerComponent { }

describe('CoursesComponent', () => {
    let component: CoursesComponent
    let fixture: ComponentFixture<CoursesComponent>
    let coursesSrv: CoursesService
    let loader: LoaderService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, BaseModule],
            declarations: [
                CoursesComponent,
                CourseItemComponent,
                ToolboxComponent,
                CreateDateHighlighterDirective,
                DurationPipe
            ],
            providers: [
                { provide: CoursesService, useClass: MockCoursesService },
                { provide: LoaderService, useClass: MockLoaderService }
            ]
        })
            .overrideComponent(CourseItemComponent, MockCourseItemComponent)
            .overrideComponent(ToolboxComponent, MockToolboxComponent)
            .overrideComponent(ProfilerComponent, MockProfilerComponent)
            .compileComponents()

    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesComponent)
        component = fixture.componentInstance
        coursesSrv = TestBed.get(CoursesService)
        loader = TestBed.get(LoaderService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get list of courses on init', () => {
        let getList = spyOn(coursesSrv, 'getList').and.callFake(() => [])
        component.ngOnInit()
        expect(getList).toHaveBeenCalled()
    })

    it('should be initialized with list of courses', () => {
        expect(component.courses).toBeTruthy()
    })

    it('should call delete method of service on ok', fakeAsync(() => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...", true)
        let removeItem = spyOn(coursesSrv, 'removeItem')
        let showLoader = spyOn(loader, 'show')
        let hideLoader = spyOn(loader, 'hide')
        component.courses.push(course)
        spyOn(component, 'confirmWrapper').and.callFake(() => true)

        component.onDeleteCourse(course)

        expect(showLoader).toHaveBeenCalled()

        tick(1000)

        expect(removeItem).toHaveBeenCalledWith(courseId)
        expect(hideLoader).toHaveBeenCalled()

    }))

    it('should not call delete method of service on cancel', () => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...", true)
        let removeItem = spyOn(coursesSrv, 'removeItem')
        component.courses.push(course)
        spyOn(component, 'confirmWrapper').and.callFake(() => false)
        component.onDeleteCourse(course)

        expect(removeItem).not.toHaveBeenCalled()

    })

    it('should filter courses', () => {
        let course1 = new Course(1, 'Course1', new Date(), 10, "Description...", true)
        let course2 = new Course(2, 'Course2', new Date(), 10, "Description...", true)
        let courses = [course1, course2]

        expect(CoursesComponent.filterCourses(courses, 'Course1')).toEqual([course1])
        expect(CoursesComponent.filterCourses(courses, 'Course2')).toEqual([course2])
        expect(CoursesComponent.filterCourses(courses, '')).toEqual([course1, course2])
    })

    it('should update list of properties on find event', () => {
        let course1 = new Course(1, 'Course1', new Date(), 10, "Description...", true)
        let course2 = new Course(2, 'Course2', new Date(), 10, "Description...", true)
        let courses = [course1, course2]
        let filterCourses = spyOn(CoursesComponent, 'filterCourses').and.callFake(() => courses)
        component.onFindCourses('Course1')

        expect(filterCourses).toHaveBeenCalled()
        expect(component.courses).toEqual(courses)
    })

})
