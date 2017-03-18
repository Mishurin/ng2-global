import { TestBed, inject } from '@angular/core/testing'

import { CoursesService } from './courses.service'

import { Course, CourseItem } from './index'

describe('CoursesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CoursesService]
        })
    })

    it('should be initialized', inject([CoursesService], (service: CoursesService) => {
        expect(service).toBeTruthy()
    }))

    it('should have initial courses list', inject([CoursesService], (service: CoursesService) => {
        expect(service.courses).toBeTruthy()
    }))

    it('shoud append a new item within courses list', inject([CoursesService], (service: CoursesService) => {
        let course = new Course(null, 'video', new Date(), 10, "Description...")
        service.createCourse(course)

        expect(course.id).not.toBeNull()
        expect(service.courses).toContain(course)
    }))

    it('should return a course by id', inject([CoursesService], (service: CoursesService) => {
        let course = new Course(9999, 'video', new Date(), 10, "Description...")
        service.courses.push(course)

        expect(service.getCourseById(9999)).toBe(course)
    }))

    it('should return an index by id', inject([CoursesService], (service: CoursesService) => {
        let course = new Course(9999, 'video', new Date(), 10, "Description...")
        service.courses.push(course)
        let courseId = service.getIndexById(9999)
        
        expect(service.courses[courseId]).toBe(course)
        
        let nonExistentId = service.getIndexById(Number.POSITIVE_INFINITY)
        expect(nonExistentId).toBeNull()
    }))

    it('should return list of courses', inject([CoursesService], (service: CoursesService) => {
        expect(service.getList()).toBe(service.courses)
    }))

    it('should update course fields', inject([CoursesService], (service: CoursesService) => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...")
        service.courses.push(course)
        let newType = 'new type'
        let newDate = new Date()
        let newDuration = 9999
        let newDescription = 'new desc'
        let newFields: CourseItem = {
            type: newType,
            date: newDate,
            duration: newDuration,
            description: newDescription
        }
        service.updateItem(course.id, newFields)

        expect(course.id).toBe(courseId)
        expect(course.type).toBe(newType)
        expect(course.date).toBe(newDate)
        expect(course.duration).toBe(newDuration)
        expect(course.description).toBe(newDescription)
    }))

    it('should remove item from list', inject([CoursesService], (service: CoursesService) => {
        let courseId = 9999
        let course = new Course(courseId, 'video', new Date(), 10, "Description...")
        service.courses.push(course)

        expect(service.courses).toContain(course)

        service.removeIem(courseId)

        expect(service.courses).not.toContain(course)

    }))

})
