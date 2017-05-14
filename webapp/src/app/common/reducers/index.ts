export * from './courses.reducer'

import { Page, CourseItem }  from '../index'
import { CoursesActions } from '../actions/index'

export interface AppStore {
    page(state: Page<CourseItem>, action: CoursesActions): Page<CourseItem>
}
