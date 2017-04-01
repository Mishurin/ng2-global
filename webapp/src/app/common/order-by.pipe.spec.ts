import { OrderByPipe } from './order-by.pipe'

describe('OrderByPipe', () => {

    it('create an instance', () => {
        const pipe = new OrderByPipe()
        expect(pipe).toBeTruthy()
    })

    it('should order collection by property', () => {
        let a = {
            name: 'a',
            date: new Date()
        }
        let b = {
            name: 'b',
            date: new Date()
        }
        let originalCollection = [b, a]
        let sortedCollection = [a, b]
        const pipe = new OrderByPipe()
        expect(pipe.transform(originalCollection, 'name')).toEqual(sortedCollection)
        expect(pipe.transform(originalCollection, 'date')).toEqual(sortedCollection)
    })
})
