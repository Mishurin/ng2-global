import { CourseItem, CoursesActions, Page } from '../index'
import { getIndexById } from '../../utils/collection.utils'
import {
    ADD_COURSE_SUCCESS,
    LOAD_COURSES_SUCCESS,
    REMOVE_COURSE_SUCCESS,
    UPDATE_COURSE_SUCCESS,
} from '../index'


export const coursesInitialState: Page<CourseItem> = {
    items: [],
    count: null,
    limit: null
}

export function coursesReducer(state:Page<CourseItem> = coursesInitialState, action: CoursesActions): Page<CourseItem> {
    switch(action.type) {
        case LOAD_COURSES_SUCCESS: {
            return {
                items: action.payload.items,
                count: action.payload.count,
                limit: action.payload.limit
            }
        }
        case ADD_COURSE_SUCCESS: {
            return {
                items: [...state.items, action.payload],
                count: state.count + 1,
                limit: state.limit
            }
        }
        case REMOVE_COURSE_SUCCESS: {
            let itemsCopy = [...state.items]
            itemsCopy.splice(getIndexById(action.payload, itemsCopy), 1)
            return {
                items: itemsCopy,
                count: state.count - 1,
                limit: state.limit
            }
        }
        case UPDATE_COURSE_SUCCESS: {
            let itemsCopy = [...state.items]
            let updatedItemIndex = getIndexById(action.payload.id, itemsCopy)
            itemsCopy[updatedItemIndex] = {... action.payload }
            return {
                items: itemsCopy,
                count: state.count,
                limit: state.limit
            }
        }
        default: {
            return state;
        }
    }
}