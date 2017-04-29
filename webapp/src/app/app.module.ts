import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { AppCommonModule } from './common/index'
import { BaseModule } from './base/index'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { CoursesComponent } from './courses/courses.component'
import { CourseDetailsComponent } from './course-details/course-details.component'
import { ToolboxComponent } from './courses/toolbox.component'
import { CourseItemComponent } from './courses/course-item.component'

import { CreateDateHighlighterDirective } from './courses/create-date-highlighter.directive'

import { routes } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';

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
        NotFoundComponent
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
