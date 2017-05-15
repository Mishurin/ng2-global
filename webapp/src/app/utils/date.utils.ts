export function getTimeSpanInDays(date1: Date, date2: Date): number {
    let diff: number = date1.getTime() - date2.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function convertToDate(val: string, sep: string = '/'): Date {
    let tokens = val.split(sep);
    return new Date(+tokens[2], +tokens[1] - 1, +tokens[0])
}