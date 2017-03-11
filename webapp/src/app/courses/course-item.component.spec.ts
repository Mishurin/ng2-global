import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CourseItemComponent } from './course-item.component';
import { ToolboxComponent } from './toolbox.component';

import { CoureItemMock } from '../common/entities/course-item.mock';

describe('CourseItemComponent', () => {
    let component: CourseItemComponent;
    let fixture: ComponentFixture<CourseItemComponent>;

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
        component.course = CoureItemMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit delete event', (done) => {

        component.deleteCourse.subscribe((event) => {
            expect(event).toBe(component.course);
            done();
        });

        component.delete();

    });

});
