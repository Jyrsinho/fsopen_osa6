
import { create } from 'zustand'
import anecdoteService from "./services/anecdotes.js";

const asObject = anecdote => ({
    content: anecdote,
    votes: 0
})

const useAnecdoteStore = create((set) => ({
    anecdotes: [],
    filter: '',
    actions: {
        vote: (id) => {
            set(state => ({
                anecdotes: state.anecdotes.map((anecdote) =>
                    anecdote.id === id
                        ? { ...anecdote, votes: anecdote.votes + 1 }
                        : anecdote
                )
            }))
        },
        createAnecdote: async (newAnecdoteContent) => {
            const anecdoteObject = asObject(newAnecdoteContent);
            const createdAnecdote = await anecdoteService.create(anecdoteObject)
            set(state => ({ anecdotes: [...state.anecdotes, createdAnecdote] }))
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
    console.log('anecdotes - ', anecdotes)
    console.log('filter - ', filter)
    return anecdotes.filter(( anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
