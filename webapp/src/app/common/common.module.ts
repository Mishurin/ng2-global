import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoursesService } from './courses.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CoursesService, AuthService, AuthGuard]
})
export class AppCommonModule { }
