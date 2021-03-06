import { Course } from './course-item.model'

const dayMiliseconds = 24 * 60 * 60 * 1000
const twoWeeks = dayMiliseconds * 14
let now = new Date();
let tomorrow = new Date(now.getTime() + dayMiliseconds)
let twoWeeksAgo = new Date(now.getTime() - twoWeeks)
let moreThenTwoWeeks = new Date(now.getTime() - (twoWeeks + dayMiliseconds * 1))

export const CoursesListMock = [
    new Course(1, 'Angular in action', now, 20, "Angular Global 1", true),
    new Course(2, 'Angular fundamentals', tomorrow, 15, "Angular Global 2", false),
    new Course(3, 'Angular one more time', twoWeeksAgo, 20, "Angular Global 3", true),
    new Course(4, 'How about angular?', moreThenTwoWeeks, 10, "Angular Global 4", false),
]