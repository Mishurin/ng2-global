import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router';

import { AppCommonModule } from './common/index'
import { BaseModule } from './base/index'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { CoursesComponent } from './courses/courses.component'
import { CourseDetailsComponent } from './course-details/course-details.component'
import { ToolboxComponent } from './courses/toolbox.component'
import { CourseItemComponent } from './courses/course-item.component'
import { DurationComponent } from './add-course/duration.component'
import { DateComponent } from './add-course/date.component'

import { CreateDateHighlighterDirective } from './courses/create-date-highlighter.directive'

import { routes } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CoursesComponent,
        CourseDetailsComponent,
        ToolboxComponent,
        CourseItemComponent,
        CreateDateHighlighterDirective,
        AddCourseComponent,
        DurationComponent,
        DateComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        HttpModule,
        AppCommonModule,
        BaseModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
