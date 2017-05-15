import * as utils from './date.utils'

describe('date utils', () => {

    beforeEach(() => {

    })

    it('should provide time span for two dates in days', () => {
        let now = new Date()
        let dayMiliseconds = 24 * 60 * 60 * 1000
        let tomorrow = new Date(now.getTime() + dayMiliseconds)
        expect(utils.getTimeSpanInDays(now, tomorrow)).toBe(-1)
        expect(utils.getTimeSpanInDays(tomorrow, now)).toBe(1)
    })

    it('should convert formatted date to Date object', () => {
        let result = utils.convertToDate('28/09/2017')
        expect(result instanceof Date).toBeTruthy()
        expect(result.getDate()).toBe(28)
        expect(result.getMonth()).toBe(8)
        expect(result.getFullYear()).toBe(2017)
    })

})
