import * as utils from './collection.utils'

import { Course } from '../common/index'

describe('date utils', () => {

    beforeEach(() => {

    })

    it('should return an index by id', () => {
        let course1 = new Course(1, 'video', new Date(), 10, "Description...", true)
        let course2 = new Course(9999, 'video', new Date(), 10, "Description...", true)
        let courses = [course1, course2]

        let courseId = utils.getIndexById(1, courses)
        expect(courses[courseId]).toBe(course1)

        let nonExistentId = utils.getIndexById(Number.POSITIVE_INFINITY, courses)
        expect(nonExistentId).toBeNull()
    })

})
