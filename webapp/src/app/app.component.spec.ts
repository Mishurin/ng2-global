import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { BaseModule } from './base/index';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BaseModule],
            declarations: [
                AppComponent,
                CoursesComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
