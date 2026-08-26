import {useAnecdoteActions} from "../store.js";

export function AnecdoteForm() {
    const { createAnecdote } = useAnecdoteActions()

    const handleSubmit = (e) => {
        e.preventDefault()
        const anecdoteContent = e.target.anecdote.value
        createAnecdote(anecdoteContent)
        e.target.reset()
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={ (e) => handleSubmit(e)}>
            <div>
                <input name='anecdote' data-testid="new"/>
            </div>
            <button>create</button>
        </form>
    </div>
    )}
export default AnecdoteForm