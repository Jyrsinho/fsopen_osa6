import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook , act } from "@testing-library/react";

vi.mock('../services/anecdotes.js', () => ({
    default: {
        getAll: vi.fn()
    },
}))

import anecdoteService from "../services/anecdotes.js";
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from "./useAnecdoteStore.js";

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
            {
                content: 'testing is easy when using Vitest',
                votes: 0,
                id: 1
            }
        ]
        anecdoteService.getAll.mockResolvedValue(expectedAnecdotes)

        const { result } = renderHook( () => useAnecdoteActions());

        await act( async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook( () => useAnecdotes() );
        expect(anecdoteResult.current).toEqual(expectedAnecdotes)
    })
})
