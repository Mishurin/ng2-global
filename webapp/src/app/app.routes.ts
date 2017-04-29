import { Routes } from '@angular/router'

import { CoursesComponent } from './courses/courses.component'
import { LoginComponent } from './login/login.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { CourseDetailsComponent } from './course-details/course-details.component'

import { AuthGuard } from './common/auth.guard'

export const routes: Routes = [
    {
        path: '', component: CoursesComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'new', component: AddCourseComponent, canActivate: [AuthGuard]
    },
    {
        path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuard]
    },
    {
        path: '**', component: NotFoundComponent
    }
]
