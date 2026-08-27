
import { create } from 'zustand'
import anecdoteService from "../services/anecdotes.js";

const asObject = anecdote => ({
    content: anecdote,
    votes: 0
})

const useAnecdoteStore = create((set, get) => ({
    anecdotes: [],
    filter:  '',
    actions: {
        vote: async (id) => {
            const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
            const updatedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            }
            const savedAnecdote = await anecdoteService.update(id, updatedAnecdote)
            set(state => ({
                anecdotes: state.anecdotes.map((anecdote) =>
                    anecdote.id === id
                        ? savedAnecdote
                        : anecdote
                )
            }))
        },
        createAnecdote: async (newAnecdoteContent) => {
            const anecdoteObject = asObject(newAnecdoteContent);
            const createdAnecdote = await anecdoteService.create(anecdoteObject)
            set(state => ({ anecdotes: [...state.anecdotes, createdAnecdote] }))
        },
        removeAnecdote: async (id) => {
            const anecdotes = get().anecdotes
            const updatedAnecdotes = anecdotes.filter(anecdote => anecdote.id !== id)
            set ( () => ({ anecdotes: updatedAnecdotes }))
        },
        setFilter: (filter) => {
            set(() => ({ filter: filter }))
        },
        initialize: async () => {
            const anecdotes = await anecdoteService.getAll()
            set( () => ({ anecdotes }))
        }
    }
}))

export const useAnecdotes = () => {
    const { anecdotes, filter } = useAnecdoteStore()
    return anecdotes.filter(( anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
