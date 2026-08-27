import { useAnecdoteActions } from "../stores/useAnecdoteStore.js";
import { useNotificationActions } from "../stores/useNotificationStore.js";

export function AnecdoteForm() {
    const { createAnecdote } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newAnecdote = e.target.anecdote.value
        try {
            createAnecdote(newAnecdote)
            setNotification({
                type: "success",
                message: "Anecdote successfully created.",
            })
        } catch (error) {
            console.log(error)
            setNotification({
                type: "error",
                message: error.message,
            })
        }
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