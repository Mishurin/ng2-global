import { DurationPipe } from './duration.pipe'

describe('DurationPipe', () => {
    it('create an instance', () => {
        const pipe = new DurationPipe()
        expect(pipe).toBeTruthy()
    })

    it('should return formatted string', () => {
        const pipe = new DurationPipe()
        
        expect(pipe.transform(60)).toBe('1 h')
        expect(pipe.transform(120)).toBe('2 h')
        expect(pipe.transform(80)).toBe('1 h 20 min')
        expect(pipe.transform(20)).toBe('20 min')
    })
})
