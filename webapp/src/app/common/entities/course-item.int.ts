export interface CourseItem {
    id?: number
    name: string
    date: Date
    duration: number
    description: string,
    authors?: string[]
    isTopRated?: boolean
}