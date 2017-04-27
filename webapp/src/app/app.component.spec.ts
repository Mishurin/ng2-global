import { Component, NgModule } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { APP_BASE_HREF } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'

import { BaseModule } from './base/index'
import { AppCommonModule } from './common/index'

import { AppComponent } from './app.component'
import { ToolboxComponent } from './courses/toolbox.component'
import { CoursesComponent } from './courses/courses.component'
import { CourseItemComponent } from './courses/course-item.component'
import { LoginComponent } from './login/login.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { DurationComponent } from './add-course/duration.component'
import { DateComponent } from './add-course/date.component'
import { AuthorsComponent } from './add-course/authors.component'

import { CreateDateHighlighterDirective } from './courses/create-date-highlighter.directive'

import { routes } from './app.routes'

@NgModule({})
class MockAppCommonModule { }


@NgModule({})
class MockBaseModule { }


@Component({
    selector: 'app-courses'
})
class MockCoursesComponent { }

@Component({
    selector: 'app-toolbox'
})
class MockToolboxComponent { }

@Component({
    selector: 'app-course-item'
})
class MockCourseItemComponent { }

@Component({
    selector: 'app-add-course',
})
class MockAddCourseComponent { }

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

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot(routes),
                FormsModule,
                AppCommonModule,
                BaseModule,
                HttpModule,
                ReactiveFormsModule
            ],
            declarations: [
                AppComponent,
                CoursesComponent,
                ToolboxComponent,
                CourseItemComponent,
                LoginComponent,
                AddCourseComponent,
                DurationComponent,
                CreateDateHighlighterDirective,
                DateComponent,
                AuthorsComponent
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        })
            .overrideModule(AppCommonModule, MockAppCommonModule)
            .overrideModule(BaseModule, MockBaseModule)
            .overrideComponent(CoursesComponent, MockCoursesComponent)
            .overrideComponent(ToolboxComponent, MockToolboxComponent)
            .overrideComponent(CourseItemComponent, MockCourseItemComponent)
            .overrideComponent(AddCourseComponent, MockAddCourseComponent)
            .overrideComponent(DurationComponent, MockDurationComponent)
            .overrideComponent(DateComponent, MockDateComponent)
            .overrideComponent(AuthorsComponent, MockAuthorsComponent)
            .compileComponents()
    }))

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.debugElement.componentInstance
        expect(app).toBeTruthy()
    }))

})
