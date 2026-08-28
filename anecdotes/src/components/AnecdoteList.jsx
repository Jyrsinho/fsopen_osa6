import { useAnecdoteActions, useAnecdotes } from "../stores/useAnecdoteStore.js";
import { useNotificationActions } from "../stores/useNotificationStore.js";

const AnecdoteList = () => {

    const anecdotes = useAnecdotes()
    const { vote , removeAnecdote } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const handleVote = (anecdote) => {
        try {
            vote(anecdote.id)
            setNotification({
                type: "success",
                message: `you voted '${anecdote.content}'`,
            })
        } catch (error) {
            setNotification({
                type: "error",
                message: error,
            })
        }
    }

    const handleDelete = (anecdote) => {
        console.log('lets remove anecdote - ', anecdote)
        try {
            removeAnecdote(anecdote.id)
            setNotification({
                type: "success",
                message: `Removed ${anecdote.content}`,
            })
        } catch (error) {
            setNotification({
                type: "error",
                message: error,
            })
        }
    }

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                        {anecdote.votes === 0 && <button onClick={() => handleDelete(anecdote)}>delete</button>}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default AnecdoteList