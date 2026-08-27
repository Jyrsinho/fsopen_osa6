import { useAnecdoteActions, useAnecdotes } from "../stores/useAnecdoteStore.js";
import { useNotificationActions } from "../stores/useNotificationStore.js";

const AnecdoteList = () => {

    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const handleVote = (anecdote) => {
        vote(anecdote.id)
        setNotification({
            type: "success",
            message: `Voted: ${anecdote.content}`,
        })
    }

    const sortedAnecdotes = anecdotes.toSorted((a,b) => b.votes - a.votes )

    return (
        <div>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default AnecdoteList