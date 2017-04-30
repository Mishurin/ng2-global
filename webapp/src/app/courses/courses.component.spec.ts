import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { Component, Input } from '@angular/core'

import { Observable } from 'rxjs/Rx'

import { CoursesComponent } from './courses.component'
import { ToolboxComponent } from './toolbox.component'
import { CourseItemComponent } from './course-item.component'

import { CreateDateHighlighterDirective } from './create-date-highlighter.directive'


import { Course, CoursesService, DurationPipe, OrderByPipe, CoursesListMock } from '../common/index'
import { LoaderService, ProfilerComponent, BaseModule } from '../base/index'

class MockCoursesService {
    confirmWrapper(message: string) { }
    getCoursesStream(): Observable<any> {
        return Observable.of({
            items: CoursesListMock,
            count: 10,
            limit: 5
        })
    }
    getPage(page: number, query: string): Observable<any> {
        return Observable.of({
            items: CoursesListMock,
            count: 10,
            limit: 5
        })
    }
    removeItem(id: number) {
        return Observable.of({})
    }
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
            imports: [FormsModule, BaseModule, RouterTestingModule],
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

    it('should subscribe component for courses', () => {
        let getCoursesStream = spyOn(coursesSrv, 'getCoursesStream').and.callThrough()
        component.ngOnInit()
        expect(getCoursesStream).toHaveBeenCalled()
    })

    it('should unsubscribe component from courses', () => {
        let unsubscribe = spyOn(component.coursesSubscription, 'unsubscribe');
        component.ngOnDestroy()
        expect(unsubscribe).toHaveBeenCalled()
    })

    it('should be initialized with list of courses', () => {
        expect(component.courses).toBeTruthy()
    })

    it('should call delete method of service on ok', () => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...", true)
        let removeItem = spyOn(coursesSrv, 'removeItem').and.callThrough()
        let showLoader = spyOn(loader, 'show')
        let hideLoader = spyOn(loader, 'hide')
        component.courses.push(course)
        spyOn(component, 'confirmWrapper').and.callFake(() => true)

        component.onDeleteCourse(course)

        expect(showLoader).toHaveBeenCalled()

        expect(removeItem).toHaveBeenCalledWith(courseId)
        expect(component.courses).not.toContain(course)
        expect(hideLoader).toHaveBeenCalled()

    })

    it('should not call delete method of service on cancel', () => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...", true)
        let removeItem = spyOn(coursesSrv, 'removeItem')
        component.courses.push(course)
        spyOn(component, 'confirmWrapper').and.callFake(() => false)
        component.onDeleteCourse(course)

        expect(removeItem).not.toHaveBeenCalled()

    })

    it('should update list of properties on find event', () => {
        let course1 = new Course(1, 'Course1', new Date(), 10, "Description...", true)
        let course2 = new Course(2, 'Course2', new Date(), 10, "Description...", true)
        let courses = [course1, course2]

        
        let getPage = spyOn(coursesSrv, 'getPage').and.callThrough()

        let getCoursesStream = spyOn(coursesSrv, 'getCoursesStream').and.callFake(() => {
            return Observable.of({
                items: courses,
                count: 10,
                limit: 5
            })
        })
        
        // Needed to reinitialize subscription
        component.ngOnInit()

        component.onFindCourses('Course1')

        expect(getPage).toHaveBeenCalledWith(0, 'Course1')
        expect(getCoursesStream).toHaveBeenCalled()
        expect(component.courses).toEqual(courses)
    })
   
})
