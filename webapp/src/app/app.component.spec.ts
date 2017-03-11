import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolboxComponent } from './courses/toolbox.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './courses/course-item.component';
import { BaseModule } from './base/index';

@Component({
    selector: 'app-courses'
})
class MockCoursesComponent {}

@Component({
    selector: 'app-toolbox'
})
class MockToolboxComponent {}

@Component({
    selector: 'app-course-item'
})
class MockCourseItemComponent {}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BaseModule, FormsModule],
            declarations: [
                AppComponent,
                CoursesComponent,
                ToolboxComponent,
                CourseItemComponent
            ],
        })
        .overrideComponent(CoursesComponent, MockCoursesComponent)
        .overrideComponent(ToolboxComponent, MockToolboxComponent)
        .overrideComponent(CourseItemComponent, MockCourseItemComponent)
        .compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
