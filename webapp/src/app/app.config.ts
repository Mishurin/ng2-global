export const SERVER_CONFIG = {
    HOST: 'http://localhost:3000'
}

export const ENTRY_POINTS = {
    LOGIN: 'login',
    USER_INFO: 'userinfo',
    COURSES: 'courses',
    AUTHORS: 'authors'
}

export function getEntry(entry: string) {
    return `${SERVER_CONFIG.HOST}/${entry}`
}

export const ROUTES = {
    NEW: '/new',
    COURSES: '/courses'
}