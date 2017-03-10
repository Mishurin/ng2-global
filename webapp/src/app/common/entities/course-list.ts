import { CourseItem } from './course-item.int';

class Course implements CourseItem {
    constructor(
        public id: number,
        public type: string,
        public date: Date,
        public duration: number,
        public description: string
    ) { }
    get dateFormatted() {
        return this.date.toString();
    }
}

export const COURSES = [
    new Course(1, 'video', new Date(), 20, "Angular Global 1"),
    new Course(2, 'video', new Date(), 15, "Angular Global 2"),
    new Course(3, 'text', new Date(), 20, "Angular Global 3"),
    new Course(4, 'video', new Date(), 10, "Angular Global 4"),
]