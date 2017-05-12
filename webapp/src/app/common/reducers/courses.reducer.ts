import { CourseItem, CoursesActions } from '../index'
import {
    ADD_COURSE,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAIL,

    LOAD_COURSES,
    LOAD_COURSES_SUCCESS,
    LOAD_COURSES_FAIL,

    REMOVE_COURSE,
    REMOVE_COURSE_SUCCESS,
    REMOVE_COURSE_FAIL,

    UPDATE_COURSE,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL
} from '../index'

export interface CoursesState {
    items: CourseItem[]
}

export const initialState: CoursesState = {
    items: []
}

export function coursesReducer(state = initialState, action: CoursesActions) {
    switch(action.type) {

    }
}