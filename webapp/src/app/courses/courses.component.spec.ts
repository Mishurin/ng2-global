import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { ToolboxComponent } from './toolbox.component';
import { CourseItemComponent } from './course-item.component';


import { CourseItem } from '../common/entities/course-item.int';
import { CoursesListMock } from '../common/entities/course-list.mock';


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

    it('should create', () => {
        let itemToDelete = CoursesListMock[0];
        let itemNumberBefore = CoursesListMock.length;
        let consoleLog = spyOn(console, 'log');
        component.onDeleteCourse(itemToDelete);
        let itemNumberAfter = CoursesListMock.length;

        expect(itemNumberAfter).toBeTruthy(itemNumberBefore - 1);
        expect(CoursesListMock.indexOf(itemToDelete)).toBe(0);
        expect(consoleLog).toHaveBeenCalledWith(itemToDelete.id);
        
    });

});
