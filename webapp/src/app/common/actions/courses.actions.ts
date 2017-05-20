import { Action } from '@ngrx/store'

import { CourseItem, Page } from '../index'

export const ADD_COURSE_SUCCESS = '[Collection] Add Course Success'
export const LOAD_COURSES_SUCCESS = '[Collection] Load Courses Success'
export const REMOVE_COURSE_SUCCESS = '[Collection] Remove Course Success'
export const UPDATE_COURSE_SUCCESS = '[Collection] Update Course Success'

export class AddCourseSuccessAction implements Action {
    readonly type = ADD_COURSE_SUCCESS
    constructor(public payload: CourseItem) {}
}

export class LoadCoursesSuccessAction implements Action {
    readonly type = LOAD_COURSES_SUCCESS
    constructor(public payload: Page<CourseItem>) {}
}

export class RemoveCourseSuccessAction implements Action {
    readonly type = REMOVE_COURSE_SUCCESS
    constructor(public payload: number) {}
}

export class UpdateCourseActionSuccess implements Action {
    readonly type = UPDATE_COURSE_SUCCESS
    constructor(public payload: CourseItem) {}
}

export type CoursesActions 
    = AddCourseSuccessAction 
    | LoadCoursesSuccessAction
    | RemoveCourseSuccessAction
    | UpdateCourseActionSuccess