import { Author } from './author.int'

export interface CourseItem {
    id?: number
    name: string
    date: Date
    duration: number
    description: string,
    authors?: Author[]
    isTopRated?: boolean
}