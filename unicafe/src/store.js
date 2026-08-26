import {create} from 'zustand'

const useStatisticsStore = create(set => ({
    good: 0,
    neutral: 0,
    bad: 0,
    actions: {
        voteGood: () => {
            set(state => ({ good: state.good + 1 }))
            console.log('voting for good')
        },
        voteNeutral: () => {
            set(state => ({ neutral: state.neutral + 1 }))
        },
        voteBad: () => {
            set(state => ({ bad: state.bad + 1 }))
        }
    }}))

export const useStatistics = () => useStatisticsStore(state => state)
export const useStatisticsActions = () => useStatisticsStore(state => state.actions)