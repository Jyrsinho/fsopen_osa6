import { useAnecdotes } from "../hooks/useAnecdotes.js";
import { useContext } from "react";
import NotificationContext from "../NotificationContext.jsx";

const AnecdoteList = () => {

    const { updateAnecdote, anecdotes } = useAnecdotes()
    const { setNotification } = useContext(NotificationContext)


    const handleVote = (anecdote) => {
        try {
            const votedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1,
            }
            updateAnecdote(votedAnecdote)
            setNotification(`voted for anecdote ${votedAnecdote.content}`)
        }catch(error) {
            console.log(error)
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
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList