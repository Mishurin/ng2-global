import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { ToolboxComponent } from './toolbox.component';
import { CourseItemComponent } from './course-item.component';

import { CourseItem } from '../common/entities/course-item.int';

let course: CourseItem = {
    id: 1,
    type: 'video',
    date: new Date(),
    duration: 10,
    description: "Description..."
};

@Component({
    selector: 'app-course-item'
})
class MockCourseItemComponent {
    @Input() course: CourseItem;
}

@Component({
    selector: 'app-toolbox'
})
class MockToolboxComponent { }

describe('CoursesComponent', () => {
    let component: CoursesComponent;
    let fixture: ComponentFixture<CoursesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CoursesComponent, CourseItemComponent, ToolboxComponent]
        })
            .overrideComponent(CourseItemComponent, MockCourseItemComponent)
            .overrideComponent(ToolboxComponent, MockToolboxComponent)
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
