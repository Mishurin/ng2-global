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

})
