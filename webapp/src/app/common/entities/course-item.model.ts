import { CourseItem } from './course-item.int';

export class Course implements CourseItem {
    constructor(
        public id: number,
        public type: string,
        public date: Date,
        public duration: number,
        public description: string,
        public topRated: boolean
    ) { }
    get dateFormatted() {
        return this.date.toString();
    }
}