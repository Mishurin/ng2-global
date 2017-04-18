import { CourseItem } from './course-item.int'

export class Course implements CourseItem {
    constructor(
        public id: number,
        public name: string,
        public date: Date,
        public duration: number,
        public description: string,
        public isTopRated: boolean
    ) { }
}