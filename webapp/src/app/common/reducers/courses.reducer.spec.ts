import { coursesReducer, initialState } from './courses.reducer'
import { Page, CourseItem } from '../index'

import * as actions from '../actions/courses.actions'

const PAGE_MOCK: Page<CourseItem> = {
    items: [
        {
            id: 1,
            name: 'name1',
            date: new Date(),
            duration: 100,
            description: 'description1',
            authors: [{
                id: 1,
                firstName: 'fname1',
                lastName: 'lname1'
            }],
            isTopRated: false
        },
        {
            id: 2,
            name: 'name2',
            date: new Date(),
            duration: 200,
            description: 'description2',
            authors: [{
                id: 1,
                firstName: 'fname2',
                lastName: 'lname2'
            }],
            isTopRated: false
        }
    ],
    count: 2,
    limit: 5
}

describe('CoursesReducer', () => {
    it('shoud return default state for undefined action', () => {
        const action: any = {}
        const undefinedState = undefined
        const result = coursesReducer(undefinedState, action)
        expect(result).toBe(initialState)
    })

    it('LOAD_COURSES_SUCCESS action', () => {
        const page = PAGE_MOCK
        const action = new actions.LoadCoursesSuccessAction(page)
        const result = coursesReducer(initialState, action)
        expect(result).toEqual(PAGE_MOCK)
    })

    it('ADD_COURSE_SUCCESS action', () => {
        const course = PAGE_MOCK.items[0]
        const action = new actions.AddCourseSuccessAction(course)
        const result = coursesReducer(initialState, action)
        expect(result.items).toEqual([course])
        expect(result.count).toEqual(initialState.count + 1)
        expect(result.limit).toEqual(initialState.limit)
    })

    it('REMOVE_COURSE_SUCCESS action', () => {
        const customInitialState = PAGE_MOCK
        const id = customInitialState.items[0].id
        const action = new actions.RemoveCourseSuccessAction(id)
        expect(customInitialState.items).toContain(customInitialState.items[0])
        const result = coursesReducer(customInitialState, action)
        expect(result.items).not.toContain(customInitialState.items[0])
        expect(result.count).toEqual(customInitialState.count - 1)
        expect(result.limit).toEqual(customInitialState.limit)
    })

    it('UPDATE_COURSE action', () => {
        const customInitialState = PAGE_MOCK
        const editableItem = PAGE_MOCK.items[0]
        const editedItem: CourseItem = { 
            id: editableItem.id,
            name: 'edited_name',
            date: new Date(),
            duration: editableItem.duration + 1,
            description: 'edited_description',
            authors: [... editableItem.authors, { id: 3, firstName: 'fname3', lastName: 'lname3'}],
            isTopRated: !editableItem.isTopRated
        }

        const action = new actions.UpdateCourseActionSuccess(editedItem)
        expect(customInitialState.items).toContain(editableItem)
        const result = coursesReducer(customInitialState, action)
        expect(result.items).not.toContain(editableItem)
        expect(result.items).toContain(editedItem)
        expect(result.count).toEqual(customInitialState.count)
        expect(result.limit).toEqual(customInitialState.limit)
    })
})