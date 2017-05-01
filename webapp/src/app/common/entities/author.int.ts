export interface Author {
    id: number
    firstName: string
    lastName: string
}

export interface AuthorVM extends Author {
    selected: boolean
}