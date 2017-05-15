export * from './courses.reducer'
export * from './user.reducer'

import { Page, CourseItem, UserState }  from '../index'
import { CoursesActions, UserActions } from '../actions/index'

export interface AppStore {
    page(state: Page<CourseItem>, action: CoursesActions): Page<CourseItem>
    user(state:UserState, action: UserActions): UserState
}
