import { expect, test, describe } from 'vitest'
import countPositiveVotePercentage from "./countPositiveVotePercentage"

describe('countPositiveVotePercentage', () => {
    test('returns zero when no votes', () => {
        const percentage = countPositiveVotePercentage(0,0,0)
        expect(percentage).toEqual(0)
    })
    test('returns 100 when only good votes', () => {
        const percentage = countPositiveVotePercentage(1, 0, 0)
        expect(percentage).toEqual(100)
    })
    test('returns 0 when all votes are a bad', () => {
        const percentage = countPositiveVotePercentage(0, 0, 1)
        expect(percentage).toEqual(0)
    })
    test('returns 0 when all votes are neutral', () => {
        const percentage = countPositiveVotePercentage(0, 1, 0)
        expect(percentage).toEqual(0)
    })
    test('returns 50 when half of the votes are good and half neutral', () => {
        const percentage = countPositiveVotePercentage(1, 1, 0)
        expect(percentage).toEqual(50)
    })
    test('returns 50 when half of the votes are good and half bad', () => {
        const percentage = countPositiveVotePercentage(1, 0, 1)
        expect(percentage).toEqual(50)
    })
    test('returns 33 when equal amount of good, bad and neutral votes', () => {
        const percentage = countPositiveVotePercentage(1, 1, 1)
        expect(percentage).toEqual(33)
    })
})
