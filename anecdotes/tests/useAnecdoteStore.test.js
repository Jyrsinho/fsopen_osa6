// noinspection ES6RedundantAwait

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook , act } from "@testing-library/react";
import anecdoteFixture from "./testFixtures/anecdoteTestFixtures.js";

vi.mock('../src/services/anecdotes.js', () => ({
    default: {
        getAll: vi.fn()
    },
}))

import anecdoteService from "../src/services/anecdotes.js";
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from "../src/stores/useAnecdoteStore.js";
import { initializeStore } from "./helper.js";

beforeEach( () => {
    useAnecdoteStore.setState( {
        anecdotes: [],
        filter:  '',
    })
    vi.clearAllMocks()
})

describe('useAnecdoteStore', () => {
    it('initialize loads anecdotes from service', async () => {
        const expectedAnecdotes = [
            anecdoteFixture.anecdoteWithOneVote
        ]
        anecdoteService.getAll.mockResolvedValue(expectedAnecdotes)
        await initializeStore()

        const { result: anecdoteResult } = renderHook( () => useAnecdotes() );
        expect(anecdoteResult.current).toEqual(expectedAnecdotes)
    })
    it('anecdotes from service are sorted based on votes', async () => {
        const anecdotesFromService = [
            anecdoteFixture.anecdoteWithOneVote,
            anecdoteFixture.anecdoteWithThreeVotes,
            anecdoteFixture.anecdoteWithTwoVotes
        ]

        const expectedAnecdotes = [
            anecdoteFixture.anecdoteWithThreeVotes,
            anecdoteFixture.anecdoteWithTwoVotes,
            anecdoteFixture.anecdoteWithOneVote
        ]

        anecdoteService.getAll.mockResolvedValue(anecdotesFromService)
        await initializeStore()

        const { result: anecdoteResult } = renderHook(() => useAnecdotes() );
        expect(anecdoteResult.current).toEqual(expectedAnecdotes)
    })
    it('anecdotes are filtered', async () => {
        const anecdotesFromService = [
            anecdoteFixture.anecdoteWithOnlyAChars,
            anecdoteFixture.anecdoteWithOnlyBChars
        ]

        anecdoteService.getAll.mockResolvedValue(anecdotesFromService)

        const { result } = renderHook( () => useAnecdoteActions() );

        await act(async () => {
            await result.current.initialize()
            await result.current.setFilter('a')
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes() );
        expect(anecdoteResult.current).toHaveLength(1)
    });
})
