import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router';

import { AppCommonModule } from './common/index'
import { BaseModule } from './base/index'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { CoursesComponent } from './courses/courses.component'
import { CourseDetailsComponent } from './course-details/course-details.component'
import { ToolboxComponent } from './courses/toolbox.component'
import { CourseItemComponent } from './courses/course-item.component'

import { routes } from './app.routes'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CoursesComponent,
        CourseDetailsComponent,
        ToolboxComponent,
        CourseItemComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        HttpModule,
        AppCommonModule,
        BaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
