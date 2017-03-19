import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoursesService } from './courses.service';
import { AuthService } from './auth.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CoursesService, AuthService]
})
export class AppCommonModule { }
