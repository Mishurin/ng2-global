import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CourseItemComponent } from './course-item.component';
import { ToolboxComponent } from './toolbox.component';

import { CourseItem } from '../common/entities/course-item.int';

describe('CourseItemComponent', () => {
    let component: CourseItemComponent;
    let fixture: ComponentFixture<CourseItemComponent>;
    let course: CourseItem = {
        id: 1,
        type: 'video',
        date: new Date(),
        duration: 10,
        description: "Description..."
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CourseItemComponent, ToolboxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseItemComponent);
        component = fixture.componentInstance;
        component.course = course;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit delete event', (done) => {

        component.deleteCourse.subscribe((event) => {
            expect(event).toBe(course);
            done();
        });

        component.delete();

    });

});
