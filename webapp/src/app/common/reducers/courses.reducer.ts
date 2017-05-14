import { CourseItem, CoursesActions, Page } from '../index'
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


export const initialState: Page<CourseItem> = {
    items: [],
    count: null,
    limit: null
}

export function coursesReducer(state:Page<CourseItem> = initialState, action: CoursesActions): Page<CourseItem> {
    switch(action.type) {
        case LOAD_COURSES_SUCCESS: {
            return {
                items: action.payload.items,
                count: action.payload.count,
                limit: action.payload.limit
            }
        }
        default: {
            return state;
        }
    }
}