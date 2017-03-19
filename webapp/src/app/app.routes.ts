import { Routes } from '@angular/router'

import { CoursesComponent } from './courses/courses.component'
import { LoginComponent } from './login/login.component'

import { AuthGuard } from './common/auth.guard'

export const routes: Routes = [
    {
        path: '', component: CoursesComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent
    }
]
