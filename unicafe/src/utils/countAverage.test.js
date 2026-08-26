import { expect, test, describe } from 'vitest'
import countAverage from './countAverage'

describe('countAverage', () => {
    test('returns 0 when no statistics', () => {
        const average = countAverage(0,0,0)
        expect(average).toBe(0)
    })
    test('returns 1 when all votes are good', () => {
        const average = countAverage(4,0,0)
        expect(average).toBe(1)
    })
    test('returns 0 when all votes are neutral', () => {
        const average = countAverage(0,5, 0)
        expect(average).toBe(0)
    })
    test('returns -1 when all votes are bad', () => {
        const average = countAverage(0,0,1)
        expect(average).toBe(-1)
    })
    test('returns 0.5 when half of the votes are good and half of the votes are neutral', () => {
        const average = countAverage(1,1,0)
        expect(average).toBe(0.5)
    })
    test('returns 0 when half of the votes are good and half of the votes are bad', () => {
        const average = countAverage(1,0,1)
        expect(average).toBe(0)
    })
    test('returns 0 when equally many good, bad and neutral votes', () => {
        const average = countAverage(1,1,1)
        expect(average).toBe(0)
    })
})
