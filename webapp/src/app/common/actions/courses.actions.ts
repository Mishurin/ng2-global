import { Action } from '@ngrx/store'

import { CourseItem, Page } from '../index'

export const ADD_COURSE = '[Collection] Add Course'
export const ADD_COURSE_SUCCESS = '[Collection] Add Course Success'
export const ADD_COURSE_FAIL = '[Collection] Add Course Fail'

export const LOAD_COURSES = '[Collection] Load Courses'
export const LOAD_COURSES_SUCCESS = '[Collection] Load Courses Success'
export const LOAD_COURSES_FAIL = '[Collection] Load Courses Fail'

export const REMOVE_COURSE = '[Collection] Remove Course'
export const REMOVE_COURSE_SUCCESS = '[Collection] Remove Course Success'
export const REMOVE_COURSE_FAIL = '[Collection] Remove Course Fail'

export const UPDATE_COURSE = '[Collection] Update Course'
export const UPDATE_COURSE_SUCCESS = '[Collection] Update Course Success'
export const UPDATE_COURSE_FAIL = '[Collection] Update Course Fail'


export class AddCourseAction implements Action {
    readonly type = ADD_COURSE
    constructor(public payload: CourseItem) { }
}

export class AddCourseSuccessAction implements Action {
    readonly type = ADD_COURSE_SUCCESS
    constructor(public payload: CourseItem) {}
}

export class AddCourseFailAction implements Action {
    readonly type = ADD_COURSE_FAIL
    constructor(public payload: CourseItem) {}
}

export class LoadCoursesAction implements Action {
    readonly type = LOAD_COURSES
}

export class LoadCoursesSuccessAction implements Action {
    readonly type = LOAD_COURSES_SUCCESS
    constructor(public payload: Page<CourseItem>) {}
}

export class LoadCoursesSuccessFailAction implements Action {
    readonly type = LOAD_COURSES_FAIL
    constructor(public payload: any) {}
}

export class RemoveCourseAction implements Action {
    readonly type = REMOVE_COURSE
    constructor(public payload: CourseItem) {}
}

export class RemoveCourseSuccessAction implements Action {
    readonly type = REMOVE_COURSE_SUCCESS
    constructor(public payload: number) {}
}

export class RemoveCourseFailAction implements Action {
    readonly type = REMOVE_COURSE_FAIL
    constructor(public payload: CourseItem) {}
}

export class UpdateCourseAction implements Action {
    readonly type = UPDATE_COURSE
    constructor(public payload: CourseItem) {}
}

export class UpdateCourseActionSuccess implements Action {
    readonly type = UPDATE_COURSE_SUCCESS
    constructor(public payload: CourseItem) {}
}

export class UpdateCourseActionFail implements Action {
    readonly type = UPDATE_COURSE_FAIL
    constructor(public payload: CourseItem) {}
}

export type CoursesActions 
    = AddCourseAction 
    | AddCourseSuccessAction 
    | AddCourseFailAction 
    | LoadCoursesAction
    | LoadCoursesSuccessAction
    | LoadCoursesSuccessFailAction
    | RemoveCourseAction
    | RemoveCourseSuccessAction
    | RemoveCourseFailAction
    | UpdateCourseAction
    | UpdateCourseActionSuccess
    | UpdateCourseActionFail