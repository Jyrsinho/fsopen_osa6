
import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
    content: anecdote,
    id: getId(),
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
        createAnecdote: (newAnecdote) => {
            set(state => ({ anecdotes: [...state.anecdotes, asObject(newAnecdote)] }))
        },
        setFilter: (filter) => {
            set(() => ({ filter: filter }))
        },
        initialize: (anecdotes)  => {
            set( () => ({ anecdotes: anecdotes }))
        }
    } }))

export const useAnecdotes = () => {
    const { anecdotes, filter } = useAnecdoteStore()
    console.log('anecdotes - ', anecdotes)
    console.log('filter - ', filter)
    return anecdotes.filter(( anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
