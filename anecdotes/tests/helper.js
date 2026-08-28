import { act, renderHook } from "@testing-library/react";
import { useAnecdoteActions } from "../src/stores/useAnecdoteStore.js";

export const initializeStore = async () => {

    const { result } = renderHook( () => useAnecdoteActions());

    await act(async () => {
        await result.current.initialize()
    })
}

export const setFilter = async (filter) => {
    const { result } = renderHook( () => useAnecdoteActions());

    await act(async () => {
        await result.current.setFilter(filter);
    })
}

