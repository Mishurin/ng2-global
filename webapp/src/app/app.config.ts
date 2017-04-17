export const SERVER_CONFIG = {
    HOST: 'http://localhost:3000'
}

export const ENTRY_POINTS = {
    LOGIN: 'login'
}

export function getEntry(entry: string) {
    return `${SERVER_CONFIG.HOST}/${entry}`
}