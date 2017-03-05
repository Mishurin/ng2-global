import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BaseModule } from './base/index';

import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CoursesComponent,
        CourseDetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
