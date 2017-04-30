import { Routes } from '@angular/router'

import { CoursesComponent } from './courses/courses.component'
import { LoginComponent } from './login/login.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { CourseDetailsComponent } from './course-details/course-details.component'
import { DetailsResolverService } from './course-details/details-resolver.service'

import { AuthGuard, AuthorsResolverService } from './common/index'

export const routes: Routes = [
    {
        path: '', component: CoursesComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'new', component: AddCourseComponent, canActivate: [AuthGuard], resolve: [AuthorsResolverService]
    },
    {
        path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuard], resolve: [AuthorsResolverService, DetailsResolverService]
    },
    {
        path: '**', component: NotFoundComponent
    }
]
