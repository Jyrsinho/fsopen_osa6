import { useAnecdotes } from "../hooks/useAnecdotes.js";

const AnecdoteList = () => {

    const { updateAnecdote, anecdotes } = useAnecdotes()


    const handleVote = (anecdote) => {
        const votedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1,
        }
        updateAnecdote(votedAnecdote)
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